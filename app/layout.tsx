import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/feature/header/components/HeaderNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderNav />
        {children}
      </body>
    </html>
  );
}
