import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  SITE_DESCRIPTION,
  SITE_DOCUMENT_TITLE,
  SITE_HEADLINE,
  SITE_SOCIAL_SUBLINE,
  siteBase,
} from "@/lib/site-config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteUrl = siteBase();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_DOCUMENT_TITLE,
    template: "%s · Gradia",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI CRM for detailing shops",
    "automotive appearance CRM",
    "car detailing CRM",
    "ceramic coating business software",
    "PPF shop CRM",
    "mobile detailing CRM",
    "detailing lead follow-up",
    "auto detailing scheduling",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Gradia",
    title: SITE_HEADLINE,
    description: SITE_SOCIAL_SUBLINE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_HEADLINE,
    description: SITE_SOCIAL_SUBLINE,
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
