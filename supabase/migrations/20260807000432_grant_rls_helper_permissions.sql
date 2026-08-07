begin;

grant usage on schema private to authenticated;

grant execute
  on function private.is_workspace_member(uuid)
  to authenticated;

grant execute
  on function private.has_workspace_role(
    uuid,
    public.workspace_role[]
  )
  to authenticated;

grant execute
  on function private.is_workspace_owner(uuid)
  to authenticated;

commit;