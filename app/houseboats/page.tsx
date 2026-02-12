import { Metadata } from 'next';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { PACKAGES } from '@/lib/packages-data';
import { FaqSection } from '@/components/ui/faq-section';
import { Hero } from '@/components/home/hero';
import { HouseboatFilters } from '@/components/houseboat/houseboat-filters';
import { ListingSection } from '@/components/houseboat/listing-section';

export const metadata: Metadata = {
  title: 'Alleppey Houseboat Booking 2026 | Rates | Alleppey Tourism',
  description:
    'Explore the best Alleppey Boat House rates for every budget. Choose from Budget AC, Deluxe, or Luxury Premium boats. View packages & book today',
  alternates: {
    canonical: '/houseboats',
  },
};

import { ScrollReveal } from '@/components/ui/scroll-reveal'; // Add import

export default function HouseboatsPage() {
  const houseboatActivity = PACKAGES.houseboat;

  const allHouseboats = (houseboatActivity.variants || []).map(v => ({
    ...v,
    parentImage: v.images?.[0]?.src || houseboatActivity.images[0].src,
    parentId: houseboatActivity.id,
    parentDesc: houseboatActivity.description,
  }));

  const privateBoats = allHouseboats.filter(h => !h.name.toLowerCase().includes('shared'));
  const sharedBoats = allHouseboats.filter(h => h.name.toLowerCase().includes('shared'));

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main>
        <ScrollReveal className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
              Alleppey Houseboat Booking: Deluxe, Premium & Luxury Packages
            </h1>
          </div>
        </ScrollReveal>

        <Hero
          slides={[
            {
              image: houseboatActivity.images[0].src,
              title: '',
              subtitle: 'Choose from Budget AC, Deluxe, or Luxury Premium boats',
              buttonText: 'View Houseboats',
              buttonUrl: '#private',
            }
          ]}
        />

        {/* <HouseboatFilters /> */}

        <div className="space-y-4 md:space-y-20 pb-20">
          <ListingSection
            id="shared"
            title="Shared Houseboats"
            subtitle="Budget friendly social stays."
            badge="Per Room Booking"
            boats={sharedBoats}
          />

          <ListingSection
            id="private"
            title="Private Collection"
            subtitle="Entire boat exclusively for your group. Enjoy ultimate privacy and personalized service."
            badge="Private Booking"
            boats={privateBoats}
          />

          <div className="max-w-4xl mx-auto px-6 pt-10 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tight">
              Premium Alleppey Houseboat Experience & Luxury Stays
            </h2>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover the magic of the Kerala backwaters with our top-rated Alleppey boat house rentals. Our houseboats are floating luxury hotels featuring dedicated chefs, ensuite bathrooms, and premium amenities for an unforgettable stay in the heart of nature.
            </p>

            <FaqSection
              title="Frequently Asked Questions"
              className="mb-12 md:mb-20"
              items={[
                {
                  q: 'Is food included in the houseboat package?',
                  a: 'Yes, all meals are included! Your package covers Welcome Drink, Lunch, Evening Tea & Snacks, Dinner, and Breakfast. We serve authentic Kerala-style cuisine.',
                },
                {
                  q: 'What are the AC timings on the houseboat?',
                  a: `It depends on your package category:

Deluxe Boats: AC is available in the bedroom from 9:00 PM to 6:00 AM (for sleeping only).

Premium & Luxury Boats: AC is available Full-Time in the bedroom (and Living Area for Luxury boats) whenever the generator is running.

Tip: If you are sensitive to heat/humidity, we highly recommend booking a Premium or Luxury boat.`,
                },
                {
                  q: 'Does the houseboat move at night?',
                  a: 'No. As per Government regulations, all houseboats in Alleppey must anchor by 5:30 PM. They cruise from 12:00 PM to 5:30 PM. The night is spent docked lakeside, where you can enjoy dinner and the silence of nature',
                },
                {
                  q: 'What is the standard Check-in and Check-out time?',
                  a: `Check-in: 12:00 PM (Noon). We recommend arriving on time to maximize your cruising hours.
Check-out: 09:00 AM the next morning, after breakfast.`,
                },
                {
                  q: "What is the difference between Deluxe and Premium Houseboats?",
                  a: "The main difference is Air Conditioning. Deluxe boats have AC only in the bedroom from 9 PM to 6 AM. Premium boats have AC in the bedroom anytime you want. If you are visiting in summer (March-May), we highly recommend Premium."
                },
              ]}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
