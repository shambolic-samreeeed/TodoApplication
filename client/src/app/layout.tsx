import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Task Tracker",
  description: "Full-stack task tracker with Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
