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
    default: "Gradia — The Vertical Company",
    template: "%s · Gradia",
  },
  description:
    "AI Digital Employees that answer calls, capture leads, and run your operations — built for healthcare, finance, and service businesses.",
  keywords: [
    "AI receptionist",
    "digital front desk",
    "healthcare call answering",
    "home services lead capture",
    "professional services intake",
    "24/7 phone answering",
    "appointment scheduling AI",
    "missed call recovery",
    "front desk automation",
    "HIPAA-ready AI",
    "AI digital employee",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gradia",
    title: "Gradia — The Vertical Company",
    description:
      "AI Digital Employees that answer calls, capture leads, and run your operations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradia — The Vertical Company",
    description:
      "AI Digital Employees that answer calls, capture leads, and run your operations.",
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
        {children}
      </body>
    </html>
  );
}
