import { auth } from "@/auth";
import { getPerformanceForClient } from "@/lib/portal/data";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  const clientId = session?.user?.clientId;
  if (!clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await getPerformanceForClient(clientId);
  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(
    {
      accountName: data.accountName,
      summary: data.summary,
      employees: data.employees,
      recentActivity: data.recentActivity,
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
