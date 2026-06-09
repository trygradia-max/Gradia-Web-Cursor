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
    default: "AI Front Office for Car Detailers — Answer, Quote & Book 24/7",
    template: "%s · Gradia",
  },
  description:
    "An AI office for auto detailers. Two agents, one brain: answer every call 24/7, quote and book over the phone, and follow up with every lead by text and email — and you approve everything before it sends. $20/mo. Join the waitlist.",
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
    title: "AI Front Office for Car Detailers — Answer, Quote & Book 24/7",
    description:
      "Two AI agents, one brain — answer every call 24/7, quote and book over the phone, and follow up with every lead by text and email. You approve everything before it sends. $20/mo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Front Office for Car Detailers — Answer, Quote & Book 24/7",
    description:
      "Two AI agents, one brain — answer every call 24/7, quote and book over the phone, and follow up with every lead by text and email. You approve everything before it sends. $20/mo.",
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
