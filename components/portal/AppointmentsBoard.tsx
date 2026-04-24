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
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback((id: string) => {
    setModalId(id);
    setDealDigits("");
    setErrorMsg(null);
  }, []);

  const closeModal = useCallback(() => {
    setModalId(null);
    setDealDigits("");
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
      const res = await fetch(`/api/portal/appointments/${modalId}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dealValue: parsedDeal }),
      });
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
        setRows((prev) => prev.map((r) => (r.id === next.id ? next : r)));
      }
      if (typeof json.monthlyPerformanceFeesTotal === "number") {
        setMonthlyTotal(json.monthlyPerformanceFeesTotal);
      }
    } catch {
      setErrorMsg("Network error");
    }
  };

  const portalCard =
    "rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] shadow-card";

  return (
    <>
      <h2 className="font-sans text-lg font-semibold text-white">
        Appointments
      </h2>
      {errorMsg && !modalId ? (
        <p className="mt-2 text-sm text-red-400" role="alert">
          {errorMsg}
        </p>
      ) : null}
      <ul className="mt-4 space-y-3">
        {rows.length === 0 ? (
          <li className={`${portalCard} p-4 text-sm text-[var(--muted)]`}>
            No appointments yet.
          </li>
        ) : (
          rows.map((item) => (
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

              {isSold(item.status) ? (
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-semibold text-emerald-400">
                    Sold ✓
                  </p>
                  {item.dealValue != null && (
                    <p className="text-xs text-[var(--muted)]">
                      Deal: {formatUsd(item.dealValue)}
                      {item.performanceFee != null && (
                        <>
                          {" "}
                          · Fee:{" "}
                          <span className="font-semibold text-[#3B6EF5]">
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
                      className="mt-1 text-xs font-medium text-[#6B7280] underline-offset-2 hover:text-white hover:underline"
                    >
                      Undo
                    </button>
                  ) : null}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openModal(item.id)}
                  className="mt-3 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                >
                  Sold ✓
                </button>
              )}
            </li>
          ))
        )}
      </ul>

      {modalId ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
            aria-label="Close dialog"
            onClick={closeModal}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-sale-title"
            className="relative z-[101] w-full max-w-[480px] bg-[#FFFFFF] p-10 font-sans shadow-xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3B6EF5]">
              Confirm sale
            </p>
            <h3
              id="confirm-sale-title"
              className="mt-3 text-2xl font-bold leading-snug text-[#0A0A0A]"
            >
              Enter the confirmed deal value
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">
              This is used to calculate your Gradia performance fee (0.5%)
            </p>

            <label className="mt-8 block">
              <span className="text-sm font-medium text-[#0A0A0A]">Deal Value</span>
              <div className="relative mt-2">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-[#0A0A0A]">
                  $
                </span>
                <input
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
                  className="w-full rounded-none border border-[#E5E7EB] py-3 pl-8 pr-4 text-base text-[#0A0A0A] outline-none transition focus:border-[#3B6EF5] focus:ring-1 focus:ring-[#3B6EF5]"
                />
              </div>
            </label>

            <div className="mt-6">
              <p className="text-sm text-[#6B7280]">
                Performance fee for this deal:
              </p>
              <p className="mt-1 text-xl font-bold text-[#3B6EF5]">
                {parsedDeal > 0 ? formatUsd(liveFee) : "—"}
              </p>
              <p className="mt-2 text-sm text-[#6B7280]">
                Example: $15,000 deal = $75.00 fee
              </p>
            </div>

            <p className="mt-6 text-sm text-[#6B7280]">
              Your total performance fees this month:{" "}
              <span className="font-semibold text-[#0A0A0A]">
                {formatUsd(monthlyTotal)}
              </span>
            </p>

            {errorMsg ? (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {errorMsg}
              </p>
            ) : null}

            <button
              type="button"
              disabled={parsedDeal <= 0 || submitting}
              onClick={onConfirmSale}
              className="mt-8 w-full rounded-none bg-[#3B6EF5] py-3.5 text-center text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Saving…" : "Confirm Sale"}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="mt-4 w-full text-center text-sm text-[#6B7280] transition hover:text-[#0A0A0A]"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
