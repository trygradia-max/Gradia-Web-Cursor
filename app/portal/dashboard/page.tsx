import { redirect } from "next/navigation";
import { SectionLabel } from "@/components/marketing/SectionLabel";
import { getDashboardData } from "@/lib/portal/dashboard";
import { getPortalSession } from "@/lib/portal/session";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard",
};

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}m ${remaining}s`;
}

const portalCard =
  "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-card";

export default async function PortalDashboardPage() {
  const supabase = await createServerSupabaseClient();
  const session = await getPortalSession(supabase);
  if (!session) {
    redirect("/portal/login");
  }

  const data = await getDashboardData(supabase, session.clientId);

  return (
    <div className="mx-auto w-full max-w-content px-4 py-10 sm:px-6 sm:py-14">
      <div>
        <SectionLabel className="text-[var(--brand-amber)]">
          Client portal
        </SectionLabel>
        <h1 className="mt-2 font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl">
          Welcome, {session.companyName}
        </h1>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-3">
        <li className={`${portalCard} p-6`}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Total calls
          </p>
          <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-white">
            {data.totalCalls.toLocaleString()}
          </p>
        </li>

        <li className={`${portalCard} p-6`}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Appointments booked
          </p>
          <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-white">
            {data.appointmentsBooked.toLocaleString()}
          </p>
        </li>

        <li className={`${portalCard} p-6`}>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Avg call duration
          </p>
          <p className="mt-2 font-serif text-3xl font-normal tabular-nums text-white">
            {formatDuration(data.avgCallDurationSeconds)}
          </p>
        </li>
      </ul>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="font-serif text-lg font-normal text-white">Recent calls</h2>
          <div className={`mt-4 overflow-hidden ${portalCard}`}>
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--bg-elevated)] text-xs uppercase tracking-wider text-[var(--muted)]">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Caller</th>
                  <th className="px-4 py-3 font-medium">Duration</th>
                  <th className="px-4 py-3 font-medium">Outcome</th>
                  <th className="px-4 py-3 font-medium">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-subtle)] bg-[var(--brand-dark)]">
                {data.recentCalls.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-[var(--muted)]">
                      No recent calls.
                    </td>
                  </tr>
                ) : (
                  data.recentCalls.map((row) => (
                    <tr key={row.id} className="text-white">
                      <td className="whitespace-nowrap px-4 py-3 text-[var(--muted)] tabular-nums">
                        {new Intl.DateTimeFormat("en", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        }).format(new Date(row.date))}
                      </td>
                      <td className="px-4 py-3">{row.caller}</td>
                      <td className="whitespace-nowrap px-4 py-3 tabular-nums">
                        {formatDuration(row.durationSeconds)}
                      </td>
                      <td className="px-4 py-3 capitalize text-[var(--muted)]">
                        {row.outcome}
                      </td>
                      <td className="max-w-sm px-4 py-3">{row.summary}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="lg:col-span-1">
          <h2 className="font-serif text-lg font-normal text-white">
            Upcoming appointments
          </h2>
          <ul className="mt-4 space-y-3">
            {data.upcomingAppointments.length === 0 ? (
              <li className={`${portalCard} p-4 text-sm text-[var(--muted)]`}>
                No upcoming appointments.
              </li>
            ) : (
              data.upcomingAppointments.map((item) => (
                <li key={item.id} className={`${portalCard} p-4`}>
                  <p className="text-sm font-semibold text-white">{item.customer}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">
                    {new Intl.DateTimeFormat("en", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    }).format(new Date(item.date))}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted)]">{item.notes}</p>
                  <p className="mt-2 text-xs uppercase tracking-wide text-[var(--brand-amber)]">
                    {item.status}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
