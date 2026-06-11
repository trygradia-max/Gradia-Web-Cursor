export type AppointmentBoardItem = {
  id: string;
  date: string;
  customer: string;
  notes: string;
  status: string | null;
};

const cardClass =
  "border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5";

function statusLabel(status: string | null): string {
  if (!status) return "Booked";
  const s = status.toLowerCase();
  if (s === "sold") return "Sold";
  if (s.includes("confirm")) return "Confirmed";
  if (s.includes("book")) return "Booked";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function AppointmentsBoard({
  initialAppointments,
}: {
  initialAppointments: AppointmentBoardItem[];
}) {
  const rows = initialAppointments;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]">
          Appointments
        </h2>
      </div>

      <ul className="mt-4 grid list-none grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {rows.length === 0 ? (
          <li className={`${cardClass} text-center md:col-span-2 xl:col-span-3`}>
            <div className="mx-auto flex max-w-sm flex-col items-center gap-2 py-6">
              <span
                aria-hidden="true"
                className="block h-12 w-12 border border-[var(--dash-border-strong)]"
              />
              <p className="font-sans text-base font-medium text-white">
                No appointments yet
              </p>
              <p className="font-sans text-sm text-[var(--dash-secondary)]">
                Bookings from Gradia will appear here as they happen.
              </p>
            </div>
          </li>
        ) : (
          rows.map((item) => {
            const dateLabel = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }).format(new Date(item.date));
            const sold = item.status?.toLowerCase() === "sold";

            return (
              <li key={item.id} className={cardClass}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-sans text-[15px] font-semibold text-white">
                      {item.customer}
                    </p>
                    <p className="mt-1 font-sans text-[12px] text-[var(--dash-secondary)] tabular-nums">
                      {dateLabel}
                    </p>
                  </div>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 border px-2 py-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] ${
                      sold
                        ? "border-[var(--dash-success)] text-[var(--dash-success)]"
                        : "border-[var(--dash-border-strong)] text-[var(--dash-secondary)]"
                    }`}
                  >
                    {statusLabel(item.status)}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 font-sans text-sm leading-snug text-[var(--dash-secondary)]">
                  {item.notes}
                </p>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
}
