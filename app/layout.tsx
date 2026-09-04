import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_CATEGORY,
  SITE_DESCRIPTION,
  SITE_HEADLINE,
  siteBase,
} from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = siteBase();
const defaultTitle = `Gradia — ${SITE_CATEGORY}`;
const defaultDescription = `${SITE_HEADLINE} ${SITE_DESCRIPTION}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s · Gradia",
  },
  description: defaultDescription,
  keywords: [
    "AI CRM for detailing shops",
    "automotive appearance CRM",
    "car detailing CRM",
    "ceramic coating business software",
    "PPF shop CRM",
    "mobile detailing CRM",
    "detailing lead follow-up",
    "auto detailing scheduling",
    "asks-first automation for detailers",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gradia",
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
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
