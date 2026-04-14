"use client";

import { Button } from "@/components/ui/Button";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

export function SignOutButton() {
  async function onSignOut() {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    window.location.href = "/portal/login";
  }

  return (
    <Button
      type="button"
      variant="secondary"
      className="px-4 py-2 text-sm"
      onClick={onSignOut}
    >
      Sign out
    </Button>
  );
}
