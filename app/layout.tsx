import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bobby Liu — Cybersecurity & Software",
  description: "Bobby Liu builds software, studies systems, and works in cybersecurity.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
