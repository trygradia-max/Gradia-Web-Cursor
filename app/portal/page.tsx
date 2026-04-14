import { getPortalSession } from "@/lib/portal/session";
import { redirect } from "next/navigation";

export default async function PortalHomePage() {
  const session = await getPortalSession();
  if (session) {
    redirect("/portal/dashboard");
  }

  redirect("/portal/login");
}
