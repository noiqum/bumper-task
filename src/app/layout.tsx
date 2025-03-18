import type { Metadata } from "next";
import { Oswald, Open_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";

import { ModalProvider } from '@/contexts/ModalContext';
import { Modal } from '../components/Modal/Modal';
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
        className={`${oswald.variable} ${openSans.variable} antialiased`}
      >
        <ModalProvider>
          <Navigation />
          {children}
          <Modal />
        </ModalProvider>
      </body>
    </html>
  );
}
