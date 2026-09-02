/* Pass 5 Cycle 4 — article stubs from the SEO plan (Gradia-SEO-Audit-Action-Plan §5).
   Full articles are post-cutover content work; stubs carry title, excerpt and slug only. */

export type ArticleStub = {
  slug: string;
  title: string;
  excerpt: string;
  keyword: string;
};

export const ARTICLES: ArticleStub[] = [
  {
    slug: "mobile-detailers-handle-calls-hands-busy",
    title: "How mobile detailers handle calls while their hands are wet",
    excerpt:
      "When you're mid-job, every ring is a distraction — and every missed text is a lead that drifts. Practical ways to capture intent without stopping work, and why staged follow-ups beat autopilot replies.",
    keyword: "stop missing calls car detailing",
  },
  {
    slug: "missed-call-cost-detailing-shop",
    title: "What a missed call really costs a detailing shop",
    excerpt:
      "Not every unanswered ring is a lost job — but the ones that matter are the high-intent quotes you never got back to. How to spot the leaks in your pipeline and close them without living in your inbox.",
    keyword: "missed call cost detailing",
  },
  {
    slug: "fill-detailing-calendar-without-chasing",
    title: "How to fill a detailing calendar without chasing customers",
    excerpt:
      "Open quotes, seasonal check-ins and quiet leads all need the same thing: a follow-up that actually goes out — on your schedule, with your approval. A shop-owner playbook for booked-solid weeks.",
    keyword: "detailing scheduling software",
  },
];

export function getArticle(slug: string): ArticleStub | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
