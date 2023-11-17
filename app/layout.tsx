import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Virtual Avengers",
  description: "Overview of the Virtual Avengers team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href={"/"}>Home</Link>
          <Link href={"/find-summoner-id"}> FindSummonerId</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
