"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  computePerformanceFee,
  isConfirmedAtInUtcMonth,
} from "@/lib/portal/appointments";

export type AppointmentBoardItem = {
  id: string;
  date: string;
  customer: string;
  notes: string;
  status: string | null;
  dealValue: number | null;
  performanceFee: number | null;
  confirmedAt: string | null;
};

type ApiAppointmentRow = {
  id: string;
  scheduled_at?: string | null;
  appointment_date?: string | null;
  contact_name?: string | null;
  customer_name?: string | null;
  notes?: string | null;
  status?: string | null;
  deal_value?: number | null;
  performance_fee?: number | null;
  confirmed_at?: string | null;
};

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function fromApiRow(row: ApiAppointmentRow): AppointmentBoardItem {
  return {
    id: row.id,
    date:
      row.scheduled_at ??
      row.appointment_date ??
      new Date(0).toISOString(),
    customer: row.contact_name ?? row.customer_name ?? "Unknown",
    notes: row.notes ?? "No notes",
    status: row.status ?? null,
    dealValue: row.deal_value != null ? Number(row.deal_value) : null,
    performanceFee:
      row.performance_fee != null ? Number(row.performance_fee) : null,
    confirmedAt: row.confirmed_at ?? null,
  };
}

function isSold(status: string | null) {
  return status?.toLowerCase() === "sold";
}

const cardClass =
  "border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5";

const inputClass =
  "block w-full bg-[var(--dash-bg)] border border-[var(--dash-border-strong)] px-4 py-3 font-sans text-sm text-white placeholder:text-[var(--dash-secondary)] outline-none transition-colors focus:border-[var(--dash-accent)]";

const inputLabel =
  "block font-sans text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]";

export function AppointmentsBoard({
  initialAppointments,
  initialMonthlyFeesTotal,
}: {
  initialAppointments: AppointmentBoardItem[];
  initialMonthlyFeesTotal: number;
}) {
  const [rows, setRows] = useState(initialAppointments);
  const [monthlyTotal, setMonthlyTotal] = useState(initialMonthlyFeesTotal);
  const [modalId, setModalId] = useState<string | null>(null);
  const [dealDigits, setDealDigits] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback(
    (id: string, prefillNote: string) => {
      setModalId(id);
      setDealDigits("");
      setInternalNote(prefillNote === "No notes" ? "" : prefillNote);
      setErrorMsg(null);
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalId(null);
    setDealDigits("");
    setInternalNote("");
    setErrorMsg(null);
  }, []);

  useEffect(() => {
    if (!modalId) return;
    firstFieldRef.current?.focus();
  }, [modalId]);

  useEffect(() => {
    if (!modalId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modalId, closeModal]);

  useEffect(() => {
    if (!modalId) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalId]);

  const parsedDeal = useMemo(() => {
    const n = Number(dealDigits.replace(/,/g, ""));
    return Number.isFinite(n) && n > 0 ? n : 0;
  }, [dealDigits]);

  const liveFee = useMemo(
    () => (parsedDeal > 0 ? computePerformanceFee(parsedDeal) : 0),
    [parsedDeal],
  );

  const onConfirmSale = async () => {
    if (!modalId || parsedDeal <= 0) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch(
        `/api/portal/appointments/${modalId}/confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dealValue: parsedDeal }),
        },
      );
      const json = (await res.json()) as {
        error?: string;
        appointment?: ApiAppointmentRow;
        monthlyPerformanceFeesTotal?: number;
      };
      if (!res.ok) {
        setErrorMsg(json.error ?? "Could not confirm sale");
        return;
      }
      if (json.appointment) {
        const next = fromApiRow(json.appointment);
        setRows((prev) => prev.map((r) => (r.id === next.id ? next : r)));
      }
      if (typeof json.monthlyPerformanceFeesTotal === "number") {
        setMonthlyTotal(json.monthlyPerformanceFeesTotal);
      }
      closeModal();
    } finally {
      setSubmitting(false);
    }
  };

  const onUndo = async (id: string) => {
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/portal/appointments/${id}/undo`, {
        method: "POST",
      });
      const json = (await res.json()) as {
        error?: string;
        appointment?: ApiAppointmentRow;
        monthlyPerformanceFeesTotal?: number;
      };
      if (!res.ok) {
        setErrorMsg(json.error ?? "Could not undo");
        return;
      }
      if (json.appointment) {
        const next = fromApiRow(json.appointment);
        setRows((prev) =>
          prev.map((r) => (r.id === next.id ? next : r)),
        );
      }
      if (typeof json.monthlyPerformanceFeesTotal === "number") {
        setMonthlyTotal(json.monthlyPerformanceFeesTotal);
      }
    } catch {
      setErrorMsg("Network error");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]">
          Appointments
        </h2>
        <p className="font-sans text-[12px] text-[var(--dash-secondary)]">
          Performance fees this month:{" "}
          <span className="font-medium text-white tabular-nums">
            {formatUsd(monthlyTotal)}
          </span>
        </p>
      </div>

      {errorMsg && !modalId ? (
        <p
          className="mt-3 font-sans text-sm text-[var(--dash-danger)]"
          role="alert"
        >
          {errorMsg}
        </p>
      ) : null}

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
            const sold = isSold(item.status);
            const dateLabel = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }).format(new Date(item.date));

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
                  {sold ? (
                    <span className="inline-flex shrink-0 items-center gap-1.5 border border-[var(--dash-success)] px-2 py-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-success)]">
                      Sold
                    </span>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1.5 border border-[var(--dash-border-strong)] px-2 py-0.5 font-sans text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--dash-secondary)]">
                      Booked
                    </span>
                  )}
                </div>

                <p className="mt-3 line-clamp-2 font-sans text-sm leading-snug text-[var(--dash-secondary)]">
                  {item.notes}
                </p>

                {sold ? (
                  <div className="mt-4 space-y-1 border-t border-[var(--dash-border)] pt-3">
                    {item.dealValue != null && (
                      <p className="font-sans text-[12px] text-[var(--dash-secondary)] tabular-nums">
                        Deal:{" "}
                        <span className="text-white">
                          {formatUsd(item.dealValue)}
                        </span>
                        {item.performanceFee != null && (
                          <>
                            {"  ·  Fee: "}
                            <span className="font-medium text-[var(--dash-accent)]">
                              {formatUsd(item.performanceFee)}
                            </span>
                          </>
                        )}
                      </p>
                    )}
                    {isConfirmedAtInUtcMonth(item.confirmedAt) ? (
                      <button
                        type="button"
                        onClick={() => onUndo(item.id)}
                        className="cursor-pointer bg-transparent font-sans text-[12px] text-[var(--dash-secondary)] underline-offset-2 transition-colors hover:text-white hover:underline"
                      >
                        Undo
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => openModal(item.id, item.notes)}
                    className="mt-4 inline-flex w-full cursor-pointer items-center justify-center border border-[var(--dash-border-strong)] bg-transparent px-4 py-2 font-sans text-[13px] font-medium text-white transition-colors hover:border-[var(--dash-success)] hover:text-[var(--dash-success)]"
                  >
                    Mark as Sold
                  </button>
                )}
              </li>
            );
          })
        )}
      </ul>

      {modalId ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-[rgba(0,0,0,0.8)]"
            aria-label="Close dialog"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-sale-title"
            className="relative z-[101] w-full max-w-[480px] border border-[var(--dash-border)] bg-[var(--dash-surface)] p-8 font-sans sm:p-10"
            style={{ maxWidth: "min(480px, 90vw)" }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--dash-accent)]">
              Confirm deal
            </p>
            <h3
              id="confirm-sale-title"
              className="mt-2 text-[24px] font-bold leading-tight text-white sm:text-[28px]"
            >
              Mark as Sold
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--dash-secondary)]">
              Confirm the closed deal value to log a 0.5% performance fee.
            </p>

            <div className="mt-7 space-y-5">
              <div>
                <label htmlFor="confirm-deal-value" className={inputLabel}>
                  Deal Value
                </label>
                <div className="relative mt-2">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-sans text-sm text-[var(--dash-secondary)]"
                  >
                    $
                  </span>
                  <input
                    id="confirm-deal-value"
                    ref={firstFieldRef}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="0.00"
                    value={dealDigits}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^0-9.]/g, "");
                      const parts = v.split(".");
                      const next =
                        parts.length > 2
                          ? `${parts[0]}.${parts.slice(1).join("")}`
                          : v;
                      setDealDigits(next);
                    }}
                    className={`${inputClass} pl-8`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-deal-notes" className={inputLabel}>
                  Notes
                </label>
                <textarea
                  id="confirm-deal-notes"
                  rows={3}
                  placeholder="Optional context for this deal"
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  className={`${inputClass} mt-2 resize-y`}
                />
              </div>
            </div>

            <div className="mt-5 border-t border-[var(--dash-border)] pt-5">
              <p className="font-sans text-[12px] text-[var(--dash-secondary)]">
                Performance fee for this deal
              </p>
              <p className="mt-1 font-sans text-xl font-bold tabular-nums text-[var(--dash-accent)]">
                {parsedDeal > 0 ? formatUsd(liveFee) : "—"}
              </p>
              <p className="mt-3 font-sans text-[12px] text-[var(--dash-secondary)]">
                Total this month:{" "}
                <span className="font-medium text-white tabular-nums">
                  {formatUsd(monthlyTotal)}
                </span>
              </p>
            </div>

            {errorMsg ? (
              <p
                className="mt-4 font-sans text-sm text-[var(--dash-danger)]"
                role="alert"
              >
                {errorMsg}
              </p>
            ) : null}

            <button
              type="button"
              disabled={parsedDeal <= 0 || submitting}
              onClick={onConfirmSale}
              className="mt-7 inline-flex w-full cursor-pointer items-center justify-center bg-[var(--dash-accent)] px-6 py-[14px] font-sans text-sm font-medium text-white transition-[background-color] duration-150 ease-in-out hover:bg-[var(--dash-accent-hover)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Saving…" : "Confirm Sale →"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mt-2 inline-flex w-full cursor-pointer items-center justify-center border border-[var(--dash-border-strong)] bg-transparent px-6 py-[14px] font-sans text-sm text-[var(--dash-secondary)] transition-colors hover:border-white hover:text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
