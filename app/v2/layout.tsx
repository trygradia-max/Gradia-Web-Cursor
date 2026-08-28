import type { Metadata } from "next";
import "./site-v2.css";

/* site-v2 foundation preview shell. Never indexed — this route exists only
   on the site-v2 branch for Vercel-preview review of Pass 1+. */

export const metadata: Metadata = {
  title: "Gradia — site v2 preview",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className="site-v2 min-h-screen">{children}</div>;
}
