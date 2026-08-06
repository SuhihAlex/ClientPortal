begin;

create or replace function public.create_workspace_for_current_user(
  workspace_name text,
  workspace_slug text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid;
  normalized_name text;
  normalized_slug text;
  created_workspace_id uuid;
begin
  current_user_id := (select auth.uid());

  if current_user_id is null then
    raise exception 'Authentication required'
      using errcode = '42501';
  end if;

  normalized_name := trim(workspace_name);
  normalized_slug := lower(trim(workspace_slug));

  if char_length(normalized_name) < 2
    or char_length(normalized_name) > 100 then
    raise exception
      'Workspace name must contain between 2 and 100 characters'
      using errcode = '22023';
  end if;

  if normalized_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then
    raise exception 'Invalid workspace slug'
      using errcode = '22023';
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

  insert into public.workspaces (
    name,
    slug,
    owner_id,
    plan
  )
  values (
    normalized_name,
    normalized_slug,
    current_user_id,
    'free'
  )
  returning id into created_workspace_id;

  insert into public.workspace_members (
    workspace_id,
    user_id,
    role,
    status,
    joined_at
  )
  values (
    created_workspace_id,
    current_user_id,
    'owner',
    'active',
    now()
  );

  return created_workspace_id;
end;
$$;

revoke all
  on function public.create_workspace_for_current_user(text, text)
  from public;

revoke all
  on function public.create_workspace_for_current_user(text, text)
  from anon;

grant execute
  on function public.create_workspace_for_current_user(text, text)
  to authenticated;

commit;