import { createAdminSupabaseClient } from "@/lib/supabase/admin";

/**
 * Social-proof floor shown before/while real signups accumulate. The counter
 * renders BASE + the live row count, so it always reflects real growth on top
 * of the launch baseline. Adjust as the campaign progresses.
 */
const WAITLIST_BASE = 2400;

/**
 * Total to display on the landing page. Reads the live row count from the
 * `waitlist` table (see supabase/migrations/005_waitlist.sql) and adds the
 * baseline. Falls back to the baseline alone if Supabase is unconfigured or
 * unavailable, so the page never errors on a count.
 */
export async function getWaitlistCount(): Promise<number> {
  try {
    const supabase = createAdminSupabaseClient();
    const { count, error } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return WAITLIST_BASE + (count ?? 0);
  } catch {
    return WAITLIST_BASE;
  }
}
