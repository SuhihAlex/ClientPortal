begin;

create type public.project_status as enum (
  'planning',
  'in_progress',
  'client_review',
  'completed',
  'on_hold'
);

create type public.project_stage_status as enum (
  'not_started',
  'in_progress',
  'completed'
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),

  workspace_id uuid not null
    references public.workspaces(id) on delete cascade,

  user_id uuid
    references auth.users(id) on delete set null,

  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  notes text,

  created_by uuid not null
    references auth.users(id) on delete restrict,

  archived_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint clients_company_name_length
    check (char_length(trim(company_name)) between 2 and 150),

  constraint clients_contact_name_length
    check (char_length(trim(contact_name)) between 2 and 150),

  constraint clients_email_lowercase
    check (email = lower(email)),

  constraint clients_workspace_id_id_unique
    unique (workspace_id, id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),

  workspace_id uuid not null
    references public.workspaces(id) on delete cascade,

  client_id uuid not null,

  name text not null,
  description text,

  status public.project_status not null default 'planning',

  start_date date,
  deadline date,

  progress smallint not null default 0,

  cover_url text,

  created_by uuid not null
    references auth.users(id) on delete restrict,

  archived_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint projects_client_same_workspace
    foreign key (workspace_id, client_id)
    references public.clients(workspace_id, id)
    on delete restrict,

  constraint projects_name_length
    check (char_length(trim(name)) between 2 and 150),

  constraint projects_progress_range
    check (progress between 0 and 100),

  constraint projects_deadline_order
    check (
      start_date is null
      or deadline is null
      or deadline >= start_date
    )
);

create table public.project_members (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null
    references public.projects(id) on delete cascade,

  user_id uuid not null
    references auth.users(id) on delete cascade,

  created_at timestamptz not null default now(),

  constraint project_members_unique
    unique (project_id, user_id)
);

create table public.project_stages (
  id uuid primary key default gen_random_uuid(),

  project_id uuid not null
    references public.projects(id) on delete cascade,

  name text not null,
  description text,

  due_date date,

  status public.project_stage_status
    not null default 'not_started',

  position integer not null,

  progress smallint not null default 0,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint project_stages_name_length
    check (char_length(trim(name)) between 2 and 150),

  constraint project_stages_position_positive
    check (position >= 0),

  constraint project_stages_progress_range
    check (progress between 0 and 100),

  constraint project_stages_unique_position
    unique (project_id, position)
);

create index clients_workspace_id_idx
  on public.clients (workspace_id);

create unique index clients_workspace_user_idx
  on public.clients (workspace_id, user_id)
  where user_id is not null;

create index clients_workspace_archived_idx
  on public.clients (workspace_id, archived_at);

create index clients_email_idx
  on public.clients (email);

create index projects_workspace_id_idx
  on public.projects (workspace_id);

create index projects_client_id_idx
  on public.projects (client_id);

create index projects_status_idx
  on public.projects (status);

create index projects_workspace_archived_idx
  on public.projects (workspace_id, archived_at);

create index project_members_user_id_idx
  on public.project_members (user_id);

create index project_members_project_id_idx
  on public.project_members (project_id);

create index project_stages_project_id_idx
  on public.project_stages (project_id);

create trigger clients_set_updated_at
before update on public.clients
for each row
execute function public.set_updated_at();

create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();

create trigger project_stages_set_updated_at
before update on public.project_stages
for each row
execute function public.set_updated_at();

alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;
alter table public.project_stages enable row level security;

grant select, insert, update
  on public.clients
  to authenticated;

grant select, insert, update
  on public.projects
  to authenticated;

grant select, insert, delete
  on public.project_members
  to authenticated;

grant select, insert, update, delete
  on public.project_stages
  to authenticated;

create policy clients_select_allowed
on public.clients
for select
to authenticated
using (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
  or user_id = (select auth.uid())
);

create policy clients_insert_owner_team
on public.clients
for insert
to authenticated
with check (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
  and created_by = (select auth.uid())
);

create policy clients_update_owner_team
on public.clients
for update
to authenticated
using (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
)
with check (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
);

create policy projects_select_workspace_team
on public.projects
for select
to authenticated
using (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
  or exists (
    select 1
    from public.project_members pm
    where pm.project_id = id
      and pm.user_id = (select auth.uid())
  )
);

create policy projects_insert_owner_team
on public.projects
for insert
to authenticated
with check (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
  and created_by = (select auth.uid())
);

create policy projects_update_owner_team
on public.projects
for update
to authenticated
using (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
)
with check (
  private.has_workspace_role(
    workspace_id,
    array[
      'owner',
      'team_member'
    ]::public.workspace_role[]
  )
);

create policy project_members_select_project_access
on public.project_members
for select
to authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and (
        private.has_workspace_role(
          p.workspace_id,
          array[
            'owner',
            'team_member'
          ]::public.workspace_role[]
        )
        or user_id = (select auth.uid())
      )
  )
);

create policy project_members_insert_owner_team
on public.project_members
for insert
to authenticated
with check (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and private.has_workspace_role(
        p.workspace_id,
        array[
          'owner',
          'team_member'
        ]::public.workspace_role[]
      )
  )
);

create policy project_members_delete_owner_team
on public.project_members
for delete
to authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and private.has_workspace_role(
        p.workspace_id,
        array[
          'owner',
          'team_member'
        ]::public.workspace_role[]
      )
  )
);

create policy project_stages_select_project_access
on public.project_stages
for select
to authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and (
        private.has_workspace_role(
          p.workspace_id,
          array[
            'owner',
            'team_member'
          ]::public.workspace_role[]
        )
        or exists (
          select 1
          from public.project_members pm
          where pm.project_id = p.id
            and pm.user_id = (select auth.uid())
        )
      )
  )
);

create policy project_stages_insert_owner_team
on public.project_stages
for insert
to authenticated
with check (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and private.has_workspace_role(
        p.workspace_id,
        array[
          'owner',
          'team_member'
        ]::public.workspace_role[]
      )
  )
);

create policy project_stages_update_owner_team
on public.project_stages
for update
to authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and private.has_workspace_role(
        p.workspace_id,
        array[
          'owner',
          'team_member'
        ]::public.workspace_role[]
      )
  )
)
with check (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and private.has_workspace_role(
        p.workspace_id,
        array[
          'owner',
          'team_member'
        ]::public.workspace_role[]
      )
  )
);

create policy project_stages_delete_owner_team
on public.project_stages
for delete
to authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_id
      and private.has_workspace_role(
        p.workspace_id,
        array[
          'owner',
          'team_member'
        ]::public.workspace_role[]
      )
  )
);

commit;