import { auth } from "@/auth";
import { getPerformanceForClient } from "@/lib/portal/data";
import { parsePeriodDays } from "@/lib/portal/period";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await auth();
  const clientId = session?.user?.clientId;
  if (!clientId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const periodDays = parsePeriodDays(searchParams.get("period") ?? undefined);
  const data = await getPerformanceForClient(clientId, { periodDays });
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
