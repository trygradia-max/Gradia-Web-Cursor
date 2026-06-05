import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/marketing/LoadingScreen";

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
    default: "Gradia — Your 7-agent front office for car detailers",
    template: "%s · Gradia",
  },
  description:
    "Gradia is 7 AI agents that answer your calls, quote every car, fill your calendar, and chase your invoices — so you keep your hands on the car. Join the waitlist.",
  keywords: [
    "car detailing software",
    "AI for car detailers",
    "detailing business software",
    "auto detailing CRM",
    "detailer booking software",
    "AI receptionist for detailers",
    "car detail quoting",
    "mobile detailing scheduling",
    "ceramic coating business software",
    "detailing invoicing",
    "AI front office",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gradia",
    title: "Gradia — Your 7-agent front office for car detailers",
    description:
      "7 AI agents that answer your calls, quote every car, fill your calendar, and chase your invoices. Join the waitlist.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradia — Your 7-agent front office for car detailers",
    description:
      "7 AI agents that answer your calls, quote every car, fill your calendar, and chase your invoices. Join the waitlist.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen font-sans font-normal antialiased">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
