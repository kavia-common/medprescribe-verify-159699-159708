import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { APP_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description:
    "Issue and verify medical prescriptions with blockchain-backed authenticity.",
  manifest: "/manifest.webmanifest",
  applicationName: APP_NAME,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
