import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Front Office for Car Detailers — Just Tell Gradia What To Do",
    template: "%s · Gradia",
  },
  description:
    "The AI front office for auto detailers. Connect your CRM, calls, texts, email, and calendar — then ask Gradia Whisper to quote customers, book jobs, follow up with leads, and run campaigns. Gradia Agent stages every step for your approval. $20/mo. Join the waitlist.",
  keywords: [
    "car detailing software",
    "AI for car detailers",
    "detailing business software",
    "auto detailing CRM",
    "detailer booking software",
    "AI receptionist for detailers",
    "AI voice agent for detailers",
    "car detail quoting",
    "mobile detailing scheduling",
    "ceramic coating business software",
    "detailer lead follow-up",
    "AI front office",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gradia",
    title: "AI Front Office for Car Detailers — Just Tell Gradia What To Do",
    description:
      "Connect your CRM, calls, texts, email, and calendar. Then ask Gradia Whisper to quote, book, follow up, and run campaigns — Gradia Agent stages every step for your approval. $20/mo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Front Office for Car Detailers — Just Tell Gradia What To Do",
    description:
      "Connect your CRM, calls, texts, email, and calendar. Then ask Gradia Whisper to quote, book, follow up, and run campaigns — Gradia Agent stages every step for your approval. $20/mo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      {/* Waitlist-era LoadingScreen splash removed on this branch (Pass 4):
          it blacked out the page while the hero's M1 mount animation played
          behind it, and it's slated for pruning at cutover anyway. */}
      <body className="min-h-screen font-sans font-normal antialiased">
        {children}
      </body>
    </html>
  );
}
