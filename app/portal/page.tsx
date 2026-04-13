import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PortalHomePage() {
  const session = await auth();
  if (session) {
    redirect("/portal/dashboard");
  }
  redirect("/portal/login");
}
