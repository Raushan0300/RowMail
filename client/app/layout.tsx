import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RowMail - Your Personal Email Assistant",
  description: "RowMail is your personal email assistant. It helps you manage your emails, tasks, and calendar. It can also help you write better emails. It can schedule emails, snooze emails, and remind you to follow up on emails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
