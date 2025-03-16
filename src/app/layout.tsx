import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald, Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "0% Finance Car Repair | Bumper ",
  description: "Split the cost of your car repairs and servicing with 0% finance monthly installments from Bumper. Fix it. Split it. Sorted.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${openSans.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
