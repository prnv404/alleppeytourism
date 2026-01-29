import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ElevenLabsWidget from "@/components/shared/eleven-labs-widget";

// DM Sans - Closest open-source alternative to Airbnb Cereal
// Geometric, slightly rounded, excellent for UI/UX
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alleppey Houseboat Booking | Shikara, Kayak & Speed Boat",
  description: "Plan your complete trip. Book Deluxe to Luxury Alleppey Houseboats, Shikara rides, Kayaking, and Speed Boat adventures. Get all Alleppey boating packages in one site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-sans antialiased`}
      >
        {children}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
