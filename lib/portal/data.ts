import { getMockPerformance } from "./mockData";
import {
  getPerformanceFromSupabase,
  isSupabasePortalEnabled,
} from "./supabaseData";
import type { PortalPerformance } from "./types";

/**
 * Portal metrics for the signed-in tenant.
 *
 * Resolution order:
 * 1. **Supabase** — when `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
 *    are set, data is read from `portal_*` tables (see `supabase/migrations`).
 * 2. **Mock** — deterministic sample data for demos when Supabase is not configured
 *    or the tenant has no rows yet.
 *
 * For a custom HTTP API instead, use `PORTAL_API_URL` with a `fetch` below
 * and keep the return type as `PortalPerformance | null`.
 */
export async function getPerformanceForClient(
  clientId: string,
): Promise<PortalPerformance | null> {
  const apiUrl = process.env.PORTAL_API_URL;
  if (apiUrl) {
    // Example integration (uncomment and adapt when API exists):
    // const res = await fetch(`${apiUrl}/v1/clients/${clientId}/performance`, {
    //   headers: { Authorization: `Bearer ${token}` },
    //   next: { revalidate: 60 },
    // });
    // if (!res.ok) return null;
    // return (await res.json()) as PortalPerformance;
  }

  if (isSupabasePortalEnabled()) {
    return getPerformanceFromSupabase(clientId);
  }

  return getMockPerformance(clientId);
}
