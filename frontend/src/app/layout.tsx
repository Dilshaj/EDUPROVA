import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eduprova",
  description: "Advanced Learning Platform",
  icons: {
    icon: [
      { url: "/Eduprovalogo.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/Eduprovalogo.svg", type: "image/svg+xml", sizes: "32x32" },
      { url: "/Eduprovalogo.svg", type: "image/svg+xml", sizes: "96x96" },
      { url: "/Eduprovalogo.svg", type: "image/svg+xml", sizes: "144x144" },
    ],
    shortcut: ["/Eduprovalogo.svg"],
    apple: [
      { url: "/Eduprovalogo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

import SessionProvider from "../../providers/SessionProvider";
import SmoothScrollProvider from "../../providers/SmoothScrollProvider";
import ShowNavbar from "@/components/Nav_bar/ShowNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <SmoothScrollProvider>
            <ShowNavbar />
            {children}
          </SmoothScrollProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
