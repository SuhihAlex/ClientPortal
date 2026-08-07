import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

const demoPassword =
  process.env.STAGE3_SEED_DEMO_PASSWORD?.trim();

if (!url || !publishableKey || !demoPassword) {
  throw new Error("Missing Stage 3 RLS test environment variables.");
}

function createUserClient() {
  return createClient(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function signIn(email) {
  const client = createUserClient();

  const { data, error } =
    await client.auth.signInWithPassword({
      email,
      password: demoPassword,
    });

  if (error || !data.user) {
    throw error ?? new Error(`Failed to sign in: ${email}`);
  }

  return {
    client,
    user: data.user,
  };
}

async function main() {
  console.log("");
  console.log("ClientPortal — Stage 3 RLS QA");
  console.log("----------------------------");

  const {
    client: clientUser,
    user: clientIdentity,
  } = await signIn(
    "sophia.miller@alderstone.example.com",
  );

  console.log("✓ Client demo authenticated");

  const {
    data: clientMemberships,
    error: clientMembershipError,
  } = await clientUser
    .from("workspace_members")
    .select("workspace_id, user_id, role, status");

  if (clientMembershipError) {
    throw clientMembershipError;
  }

  const ownMembership = clientMemberships.find(
    (membership) =>
      membership.user_id === clientIdentity.id,
  );

  if (!ownMembership) {
    throw new Error(
      "Client cannot see own workspace membership.",
    );
  }

  console.log("✓ Client can see own workspace membership");

  const {
    data: invitations,
    error: invitationsError,
  } = await clientUser
    .from("invitations")
    .select("id");

  if (invitationsError) {
    throw invitationsError;
  }

  if (invitations.length !== 0) {
    throw new Error(
      `RLS FAILED: Client can see ${invitations.length} invitation(s).`,
    );
  }

  console.log("✓ Client cannot see workspace invitations");

  const {
    data: workspaces,
    error: workspacesError,
  } = await clientUser
    .from("workspaces")
    .select("id, name");

  if (workspacesError) {
    throw workspacesError;
  }

  if (workspaces.length !== 1) {
    throw new Error(
      `RLS FAILED: Client can see ${workspaces.length} workspaces.`,
    );
  }

  console.log("✓ Client sees exactly one workspace");

  const {
    data: profiles,
    error: profilesError,
  } = await clientUser
    .from("profiles")
    .select("id, full_name");

  if (profilesError) {
    throw profilesError;
  }

  if (
    profiles.some(
      (profile) => profile.id !== clientIdentity.id,
    )
  ) {
    throw new Error(
      "RLS FAILED: Client can see another user's profile.",
    );
  }

  console.log("✓ Client cannot see other user profiles");

  await clientUser.auth.signOut();

  console.log("");
  console.log("Stage 3 RLS QA passed.");
}

main().catch((error) => {
  console.error("");
  console.error("Stage 3 RLS QA failed.");
  console.error(error);
  process.exitCode = 1;
});