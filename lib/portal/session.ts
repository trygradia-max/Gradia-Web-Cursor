import { createServerSupabaseClient } from "@/lib/supabase/server";

export type ServerSupabaseClient = Awaited<
  ReturnType<typeof createServerSupabaseClient>
>;

type ClientRow = {
  id: string;
  name?: string | null;
  company_name?: string | null;
  auth_user_id?: string | null;
  user_id?: string | null;
};

export type PortalSession = {
  userId: string;
  email: string | null;
  clientId: string;
  companyName: string;
};

/**
 * Resolve tenant id: user metadata → clients.auth_user_id → clients.user_id →
 * clients.id === user id → fallback to auth user id (common for 1:1 setups).
 */
async function resolveClientId(
  supabase: ServerSupabaseClient,
  userId: string,
  metadataClientId: string | undefined,
): Promise<string> {
  if (metadataClientId?.trim()) return metadataClientId.trim();

  const { data: byAuth } = await supabase
    .from("clients")
    .select("id")
    .eq("auth_user_id", userId)
    .maybeSingle<Pick<ClientRow, "id">>();
  if (byAuth?.id) return byAuth.id;

  const { data: byLegacyUser } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", userId)
    .maybeSingle<Pick<ClientRow, "id">>();
  if (byLegacyUser?.id) return byLegacyUser.id;

  const { data: byId } = await supabase
    .from("clients")
    .select("id")
    .eq("id", userId)
    .maybeSingle<Pick<ClientRow, "id">>();
  if (byId?.id) return byId.id;

  return userId;
}

async function resolveCompanyName(
  supabase: ServerSupabaseClient,
  clientId: string,
  email: string | null,
): Promise<string> {
  const { data } = await supabase
    .from("clients")
    .select("id, name, company_name")
    .eq("id", clientId)
    .maybeSingle<ClientRow>();

  if (data?.company_name?.trim()) return data.company_name.trim();
  if (data?.name?.trim()) return data.name.trim();

  const local = email?.split("@")[0]?.trim();
  if (local) {
    return local.charAt(0).toUpperCase() + local.slice(1);
  }
  return "Your account";
}

export async function getPortalSession(
  supabaseClient?: ServerSupabaseClient,
): Promise<PortalSession | null> {
  const supabase =
    supabaseClient ?? (await createServerSupabaseClient());
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  const metadataClientId = user.user_metadata?.client_id as
    | string
    | undefined;

  const clientId = await resolveClientId(supabase, user.id, metadataClientId);
  const companyName = await resolveCompanyName(
    supabase,
    clientId,
    user.email ?? null,
  );

  return {
    userId: user.id,
    email: user.email ?? null,
    clientId,
    companyName,
  };
}
