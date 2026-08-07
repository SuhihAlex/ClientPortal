begin;

create or replace function public.create_workspace_invitation(
  invited_email text,
  invited_role public.workspace_role,
  invitation_ttl_hours integer default 168
)
returns table (
  invitation_id uuid,
  invitation_token text,
  expires_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid;
  current_workspace_id uuid;
  normalized_email text;
  raw_token text;
  hashed_token text;
  created_invitation_id uuid;
  created_expires_at timestamptz;
begin
  current_user_id := (select auth.uid());

  if current_user_id is null then
    raise exception 'Authentication required'
      using errcode = '42501';
  end if;

  normalized_email := lower(trim(invited_email));

  if normalized_email = ''
    or normalized_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'Invalid invitation email'
      using errcode = '22023';
  end if;

  if invited_role not in ('team_member', 'client') then
    raise exception 'Only team_member or client can be invited'
      using errcode = '22023';
  end if;

  if invitation_ttl_hours < 1
    or invitation_ttl_hours > 720 then
    raise exception 'Invitation lifetime must be between 1 and 720 hours'
      using errcode = '22023';
  end if;

  select wm.workspace_id
  into current_workspace_id
  from public.workspace_members wm
  where wm.user_id = current_user_id
    and wm.role = 'owner'
    and wm.status = 'active'
  limit 1;

  if current_workspace_id is null then
    raise exception 'Only an active workspace owner can create invitations'
      using errcode = '42501';
  end if;

  if exists (
    select 1
    from auth.users au
    join public.workspace_members wm
      on wm.user_id = au.id
    where lower(au.email) = normalized_email
      and wm.workspace_id = current_workspace_id
      and wm.status = 'active'
  ) then
    raise exception 'User is already an active workspace member'
      using errcode = '23505';
  end if;

  update public.invitations
  set
    status = 'revoked',
    updated_at = now()
  where workspace_id = current_workspace_id
    and email = normalized_email
    and status = 'pending';

  raw_token := encode(
    extensions.gen_random_bytes(32),
    'hex'
  );
  hashed_token := encode(
    extensions.digest(raw_token, 'sha256'),
    'hex'
  );
  created_expires_at :=
    now() + make_interval(hours => invitation_ttl_hours);

  insert into public.invitations (
    workspace_id,
    email,
    role,
    token_hash,
    status,
    invited_by,
    expires_at
  )
  values (
    current_workspace_id,
    normalized_email,
    invited_role,
    hashed_token,
    'pending',
    current_user_id,
    created_expires_at
  )
  returning id into created_invitation_id;

  return query
  select
    created_invitation_id,
    raw_token,
    created_expires_at;
end;
$$;

revoke all
  on function public.create_workspace_invitation(
    text,
    public.workspace_role,
    integer
  )
  from public;

revoke all
  on function public.create_workspace_invitation(
    text,
    public.workspace_role,
    integer
  )
  from anon;

grant execute
  on function public.create_workspace_invitation(
    text,
    public.workspace_role,
    integer
  )
  to authenticated;


create or replace function public.get_invitation_preview(
  invitation_token text
)
returns table (
  workspace_name text,
  invited_email text,
  invited_role public.workspace_role,
  invitation_status public.invitation_status,
  invitation_expires_at timestamptz
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    w.name,
    i.email,
    i.role,
    case
      when i.status = 'pending'
        and i.expires_at <= now()
      then 'expired'::public.invitation_status
      else i.status
    end,
    i.expires_at
  from public.invitations i
  join public.workspaces w
    on w.id = i.workspace_id
  where i.token_hash = encode(
    extensions.digest(invitation_token, 'sha256'),
    'hex'
  )
  limit 1;
$$;

revoke all
  on function public.get_invitation_preview(text)
  from public;

grant execute
  on function public.get_invitation_preview(text)
  to anon, authenticated;


create or replace function public.accept_workspace_invitation(
  invitation_token text
)
returns table (
  workspace_id uuid,
  accepted_role public.workspace_role
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid;
  current_user_email text;
  invitation_record public.invitations%rowtype;
begin
  current_user_id := (select auth.uid());

  if current_user_id is null then
    raise exception 'Authentication required'
      using errcode = '42501';
  end if;

  select lower(email)
  into current_user_email
  from auth.users
  where id = current_user_id;

  if current_user_email is null then
    raise exception 'Authenticated user email is unavailable'
      using errcode = '42501';
  end if;

  select *
  into invitation_record
  from public.invitations
  where token_hash = encode(
    extensions.digest(invitation_token, 'sha256'),
    'hex'
  )
  for update;

  if invitation_record.id is null then
    raise exception 'Invitation not found'
      using errcode = 'P0002';
  end if;

  if invitation_record.status <> 'pending' then
    raise exception 'Invitation is no longer active'
      using errcode = '22023';
  end if;

  if invitation_record.expires_at <= now() then
    update public.invitations
    set
      status = 'expired',
      updated_at = now()
    where id = invitation_record.id;

    raise exception 'Invitation has expired'
      using errcode = '22023';
  end if;

  if lower(invitation_record.email) <> current_user_email then
    raise exception 'Invitation email does not match the authenticated account'
      using errcode = '42501';
  end if;

  if exists (
    select 1
    from public.workspace_members
    where user_id = current_user_id
      and status = 'active'
  ) then
    raise exception 'User already belongs to an active workspace'
      using errcode = '23505';
  end if;

  insert into public.workspace_members (
    workspace_id,
    user_id,
    role,
    status,
    joined_at
  )
  values (
    invitation_record.workspace_id,
    current_user_id,
    invitation_record.role,
    'active',
    now()
  );

  update public.invitations
  set
    status = 'accepted',
    accepted_at = now(),
    updated_at = now()
  where id = invitation_record.id;

  return query
  select
    invitation_record.workspace_id,
    invitation_record.role;
end;
$$;

revoke all
  on function public.accept_workspace_invitation(text)
  from public;

revoke all
  on function public.accept_workspace_invitation(text)
  from anon;

grant execute
  on function public.accept_workspace_invitation(text)
  to authenticated;

commit;