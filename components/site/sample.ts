/* The ONE canonical fictional sample record (REVIEW_NOTES N3, CLAUDE.md).
   Every section that shows product UI imports from here — the continuity of a
   single record across the whole page is the moat being demonstrated, so
   sections must not be able to drift. Never invent a second sample customer. */

export const SAMPLE = {
  customer: "Sarah Mitchell",
  firstName: "Sarah",
  vehicle: "2024 BMW X5",
  service: "Full Detail + Ceramic Maintenance",
  price: "$485",
  slot: "Tue 9:00 AM",
} as const;
