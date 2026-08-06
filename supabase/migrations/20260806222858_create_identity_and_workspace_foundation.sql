begin;

create extension if not exists pgcrypto;

create type public.workspace_role as enum (
  'owner',
  'team_member',
  'client'
);

create type public.workspace_member_status as enum (
  'invited',
  'active',
  'suspended'
);

create type public.workspace_plan as enum (
  'free',
  'studio',
  'agency'
);

create type public.invitation_status as enum (
  'pending',
  'accepted',
  'revoked',
  'expired'
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  email text,
  phone text,
  website text,
  address text,
  owner_id uuid not null references auth.users(id) on delete restrict,
  plan public.workspace_plan not null default 'free',
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint workspaces_name_length
    check (char_length(name) between 2 and 100),

  constraint workspaces_slug_format
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null
    references public.workspaces(id) on delete cascade,
  user_id uuid not null
    references auth.users(id) on delete cascade,
  role public.workspace_role not null,
  status public.workspace_member_status not null default 'active',
  joined_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint workspace_members_unique_user
    unique (workspace_id, user_id),

  constraint workspace_owner_must_be_active
    check (
      role <> 'owner'
      or status = 'active'
    )
);

create table public.invitations (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null
    references public.workspaces(id) on delete cascade,
  email text not null,
  role public.workspace_role not null,
  client_id uuid,
  project_id uuid,
  token_hash text not null unique,
  status public.invitation_status not null default 'pending',
  invited_by uuid not null
    references auth.users(id) on delete restrict,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint invitations_email_lowercase
    check (email = lower(email)),

  constraint invitations_client_role
    check (
      role = 'client'
      or client_id is null
    ),

  constraint invitations_accepted_timestamp
    check (
      status <> 'accepted'
      or accepted_at is not null
    )
);

create unique index invitations_pending_email_workspace_idx
  on public.invitations (workspace_id, email)
  where status = 'pending';

create index workspace_members_user_id_idx
  on public.workspace_members (user_id);

create index workspace_members_workspace_id_idx
  on public.workspace_members (workspace_id);

create index invitations_workspace_id_idx
  on public.invitations (workspace_id);

create index invitations_email_idx
  on public.invitations (email);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create trigger workspaces_set_updated_at
before update on public.workspaces
for each row
execute function public.set_updated_at();

create trigger workspace_members_set_updated_at
before update on public.workspace_members
for each row
execute function public.set_updated_at();

create trigger invitations_set_updated_at
before update on public.invitations
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    avatar_url
  )
  values (
    new.id,
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'avatar_url'), '')
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create schema if not exists private;

revoke all on schema private from public;
revoke all on schema private from anon;
revoke all on schema private from authenticated;

create or replace function private.is_workspace_member(
  target_workspace_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = (select auth.uid())
      and status = 'active'
  );
$$;

create or replace function private.has_workspace_role(
  target_workspace_id uuid,
  allowed_roles public.workspace_role[]
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = (select auth.uid())
      and status = 'active'
      and role = any(allowed_roles)
  );
$$;

create or replace function private.is_workspace_owner(
  target_workspace_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.has_workspace_role(
    target_workspace_id,
    array['owner']::public.workspace_role[]
  );
$$;

revoke all on function private.is_workspace_member(uuid) from public;
revoke all on function private.has_workspace_role(
  uuid,
  public.workspace_role[]
) from public;
revoke all on function private.is_workspace_owner(uuid) from public;

grant usage on schema public to anon, authenticated;

grant select, update
  on public.profiles
  to authenticated;

grant select
  on public.workspaces
  to authenticated;

grant select
  on public.workspace_members
  to authenticated;

grant select
  on public.invitations
  to authenticated;

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.invitations enable row level security;

create policy profiles_select_self
on public.profiles
for select
to authenticated
using (
  id = (select auth.uid())
);

create policy profiles_update_self
on public.profiles
for update
to authenticated
using (
  id = (select auth.uid())
)
with check (
  id = (select auth.uid())
);

create policy workspaces_select_member
on public.workspaces
for select
to authenticated
using (
  private.is_workspace_member(id)
);

create policy workspace_members_select_same_workspace
on public.workspace_members
for select
to authenticated
using (
  private.is_workspace_member(workspace_id)
);

create policy invitations_select_owner
on public.invitations
for select
to authenticated
using (
  private.is_workspace_owner(workspace_id)
);

commit;