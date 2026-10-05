# marketing — AUTORUN (site-v2, Passes 2–7)

_2026-09-01. For Cursor or Claude Code building the site while the platform autorun runs. Read `CLAUDE.md`, `NEXT_TASK.md`, `../platform/docs/gradia-v2/marketing-site/site-v2-plan.md`, `../_docs/WHAT_GRADIA_DOES.md` first._

Changes vs NEXT_TASK.md:
- **ICP shift (D-036):** copy addresses established shops (multi-bay, staff, ceramic/PPF/tint), not solo mobile detailers. Team, jobs, and multi-user features are ROADMAP until E01/E04 ship — label them "arriving", never live. Solo shops remain welcome; they are not the hero.
- Batch mode: build Pass 2 sections 1→10 in order, one commit per section, run the claims check against WHAT_GRADIA_DOES §4/§5/§6 before each commit, and do NOT stop for REVIEW_NOTES between sections. The founder reviews the whole pass at the end. Then Pass 3 (real-UI compositions — screenshots must come from the current app, verify build state first), Pass 4, Pass 5 (Pricing and Receptionist pages BUILT behind flags, hidden), Pass 6.
- Pass 7 QA must be a different agent than the one that built (if Cursor built, Claude reviews, or vice versa).
- Never push to main; branch `site-v2` only. Pricing numbers and the Receptionist section stay hidden until P0-013 merges and the telephony acceptance run passes respectively.
- HARD STOP: any copy that needs a claim not in WHAT_GRADIA_DOES; any request to change the platform repo.
