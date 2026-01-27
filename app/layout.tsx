import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";


// DM Sans - Closest open-source alternative to Airbnb Cereal
// Geometric, slightly rounded, excellent for UI/UX
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alleppey Tourism - Discover the Venice of the East",
  description: "Experience the serene backwaters, luxury houseboats, and authentic Kerala culture with Alleppey Tourism. Book your unforgettable journey today.",
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

      </body>
    </html>
  );
}
