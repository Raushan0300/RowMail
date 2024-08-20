import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RowMail - Your Personal Email Assistant",
  description:
    "RowMail is your personal email assistant. It helps you manage your emails, tasks, and calendar. It can also help you write better emails. It can schedule emails, snooze emails, and remind you to follow up on emails.",
  openGraph: {
    title: "RowMail - Your Personal Email Assistant",
    description:
      "Manage your emails, tasks, and calendar with RowMail. Write better emails, schedule, snooze, and get reminders to follow up.",
    url: "https://rowmail.raushan.xyz",
    type: "website",
  },
  twitter: {
    site: "@raushan2504",
    title: "RowMail - Your Personal Email Assistant",
    description:
      "Manage your emails, tasks, and calendar with RowMail. Write better emails, schedule, snooze, and get reminders to follow up.",
  },
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
