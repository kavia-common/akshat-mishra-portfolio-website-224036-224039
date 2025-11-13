import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Geist, Geist_Mono } from "next/font/google";

const siteUrl =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_FRONTEND_URL
    ? process.env.NEXT_PUBLIC_FRONTEND_URL
    : undefined;

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Akshat Mishra – Software Developer",
  description:
    "Portfolio of Akshat Mishra, a Software Developer specializing in modern web apps, scalable systems, and clean, maintainable code.",
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  alternates: siteUrl
    ? {
        canonical: "/",
      }
    : undefined,
  openGraph: {
    title: "Akshat Mishra – Software Developer",
    description:
      "Explore Akshat Mishra’s experience, projects, skills, and certifications.",
    url: siteUrl || undefined,
    siteName: "Akshat Mishra – Software Developer",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Akshat Mishra",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Mishra – Software Developer",
    description:
      "Explore Akshat Mishra’s experience, projects, skills, and certifications.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
