import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

import VapiWidget from '@/components/shared/vapi-widget';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alleppeytourism.in'),
  title: 'Alappuzha Houseboat Booking | Shikara, Kayak & Speed Boat',
  description:
    'Plan your complete trip. Book Deluxe to Luxury Alleppey Houseboats, Shikara rides, Kayaking, and Speed Boat adventures.',

  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YCEJZLEGE7"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YCEJZLEGE7');
          `}
        </Script>
      </head>

      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}

        <VapiWidget />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
