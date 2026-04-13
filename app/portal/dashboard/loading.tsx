const skeleton =
  "animate-pulse rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80";

export default function DashboardLoading() {
  return (
    <div className="mx-auto w-full max-w-content px-4 py-10 sm:px-6 sm:py-14">
      <div className="h-4 w-24 rounded bg-white/10" />
      <div className="mt-4 h-9 max-w-md rounded bg-white/10" />
      <div className="mt-2 h-4 w-72 max-w-full rounded bg-white/5" />
      <div className="mt-8 flex flex-wrap gap-2">
        <div className={`h-10 w-28 rounded-xl ${skeleton}`} />
        <div className={`h-10 w-32 rounded-xl ${skeleton}`} />
      </div>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <li key={i} className={`${skeleton} h-28 p-6`} />
        ))}
      </ul>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <section className="space-y-3 lg:col-span-1">
          <div className="h-6 w-40 rounded bg-white/10" />
          <div className={`${skeleton} h-24`} />
          <div className={`${skeleton} h-24`} />
        </section>
        <section className="lg:col-span-2">
          <div className="h-6 w-36 rounded bg-white/10" />
          <div className={`${skeleton} mt-4 h-64`} />
        </section>
      </div>
    </div>
  );
}
