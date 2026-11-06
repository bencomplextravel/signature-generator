import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Signature Generator",
  description: "Create your email signature",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}