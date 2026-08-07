import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const ownerEmail = process.env.STAGE3_SEED_OWNER_EMAIL
  ?.trim()
  .toLowerCase();
const demoPassword =
  process.env.STAGE3_SEED_DEMO_PASSWORD?.trim();

if (!supabaseUrl) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL in .env.local",
  );
}

if (!serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
}

if (!ownerEmail) {
  throw new Error(
    "Missing STAGE3_SEED_OWNER_EMAIL in .env.local",
  );
}

if (!demoPassword || demoPassword.length < 8) {
  throw new Error(
    "STAGE3_SEED_DEMO_PASSWORD must contain at least 8 characters",
  );
}

const admin = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const demoUsers = [
  {
    email: "maya.torres@northline.example.com",
    fullName: "Maya Torres",
    role: "team_member",
  },
  {
    email: "ethan.cole@northline.example.com",
    fullName: "Ethan Cole",
    role: "team_member",
  },
  {
    email: "lena.park@northline.example.com",
    fullName: "Lena Park",
    role: "team_member",
  },
  {
    email: "sophia.miller@alderstone.example.com",
    fullName: "Sophia Miller",
    role: "client",
  },
];

async function findAuthUserByEmail(email) {
  let page = 1;

  while (true) {
    const { data, error } =
      await admin.auth.admin.listUsers({
        page,
        perPage: 200,
      });

    if (error) {
      throw error;
    }

    const user = data.users.find(
      (candidate) =>
        candidate.email?.toLowerCase() === email,
    );

    if (user) {
      return user;
    }

    if (data.users.length < 200) {
      return null;
    }

    page += 1;
  }
}

async function ensureDemoUser({
  email,
  fullName,
}) {
  const existing = await findAuthUserByEmail(email);

  if (existing) {
    const { error: profileError } = await admin
      .from("profiles")
      .upsert(
        {
          id: existing.id,
          full_name: fullName,
        },
        {
          onConflict: "id",
        },
      );

    if (profileError) {
      throw profileError;
    }

    console.log(`✓ Auth user exists: ${fullName}`);

    return existing;
  }

  const { data, error } =
    await admin.auth.admin.createUser({
      email,
      password: demoPassword,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

  if (error || !data.user) {
    throw error ?? new Error(
      `Failed to create ${fullName}`,
    );
  }

  const { error: profileError } = await admin
    .from("profiles")
    .upsert(
      {
        id: data.user.id,
        full_name: fullName,
      },
      {
        onConflict: "id",
      },
    );

  if (profileError) {
    throw profileError;
  }

  console.log(`✓ Created auth user: ${fullName}`);

  return data.user;
}

async function ensureNorthlineWorkspace(ownerUser) {
  const { data: ownerMembership, error } =
    await admin
      .from("workspace_members")
      .select("workspace_id")
      .eq("user_id", ownerUser.id)
      .eq("role", "owner")
      .eq("status", "active")
      .limit(1)
      .maybeSingle();

  if (error) {
    throw error;
  }

  if (ownerMembership) {
    const { data: workspace, error: workspaceError } =
      await admin
        .from("workspaces")
        .update({
          name: "Northline Studio",
          email: "hello@northline.example.com",
          website: "https://northline.example.com",
        })
        .eq("id", ownerMembership.workspace_id)
        .select("id, name, slug")
        .single();

    if (workspaceError) {
      throw workspaceError;
    }

    console.log(
      `✓ Using existing workspace: ${workspace.name}`,
    );

    return workspace;
  }

  const slug =
    `northline-studio-${ownerUser.id.slice(0, 8)}`;

  const { data: workspace, error: workspaceError } =
    await admin
      .from("workspaces")
      .insert({
        name: "Northline Studio",
        slug,
        email: "hello@northline.example.com",
        website: "https://northline.example.com",
        owner_id: ownerUser.id,
        plan: "studio",
      })
      .select("id, name, slug")
      .single();

  if (workspaceError) {
    throw workspaceError;
  }

  const { error: membershipError } = await admin
    .from("workspace_members")
    .insert({
      workspace_id: workspace.id,
      user_id: ownerUser.id,
      role: "owner",
      status: "active",
      joined_at: new Date().toISOString(),
    });

  if (membershipError) {
    throw membershipError;
  }

  console.log("✓ Created Northline Studio workspace");

  return workspace;
}

async function ensureMembership(
  workspaceId,
  userId,
  role,
) {
  const { error } = await admin
    .from("workspace_members")
    .upsert(
      {
        workspace_id: workspaceId,
        user_id: userId,
        role,
        status: "active",
        joined_at: new Date().toISOString(),
      },
      {
        onConflict: "workspace_id,user_id",
      },
    );

  if (error) {
    throw error;
  }
}

async function run() {
  console.log("");
  console.log("ClientPortal — Stage 3 seed");
  console.log("---------------------------");

  const ownerUser =
    await findAuthUserByEmail(ownerEmail);

  if (!ownerUser) {
    throw new Error(
      `Owner account not found: ${ownerEmail}. ` +
        "Register the Owner through /register first.",
    );
  }

  console.log("✓ Existing Owner account found");

  const workspace =
    await ensureNorthlineWorkspace(ownerUser);

  for (const demoUser of demoUsers) {
    const authUser =
      await ensureDemoUser(demoUser);

    await ensureMembership(
      workspace.id,
      authUser.id,
      demoUser.role,
    );

    console.log(
      `✓ Membership: ${demoUser.fullName} → ${demoUser.role}`,
    );
  }

  const { data: members, error: membersError } =
    await admin
      .from("workspace_members")
      .select("role, status")
      .eq("workspace_id", workspace.id)
      .eq("status", "active");

  if (membersError) {
    throw membersError;
  }

  const counts = members.reduce(
    (accumulator, member) => {
      accumulator[member.role] =
        (accumulator[member.role] ?? 0) + 1;

      return accumulator;
    },
    {},
  );

  console.log("");
  console.log("Seed complete.");
  console.log(`Workspace: ${workspace.name}`);
  console.log(
    `Owner: ${counts.owner ?? 0}`,
  );
  console.log(
    `Team members: ${counts.team_member ?? 0}`,
  );
  console.log(
    `Clients: ${counts.client ?? 0}`,
  );
  console.log("");
}

run().catch((error) => {
  console.error("");
  console.error("Stage 3 seed failed.");
  console.error(error);
  process.exitCode = 1;
});