import Image from 'next/image';
import { Navbar } from '@/components/home/navbar';
import { WhatsAppButton } from '@/components/ui/button/whatsapp';
import { Hero } from '@/components/home/hero';
import { BookingListings } from '@/components/home/listing';
import { Footer } from '@/components/home/footer';
import { Testimonials } from '@/components/home/testimonial';
import { PackageBuilder } from '@/components/home/packages';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

import { ListingGrid, ListingItem } from '@/components/ui/listing-grid';
import { FaqSection } from '@/components/ui/faq-section';
import { activities, destinations } from '@/lib/packages-data';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alleppey Houseboat Booking 2026 | Best Rates & Tours',
  description:
    'Book Deluxe to Luxury Houseboats in Alleppey, Shikara rides, Kayaking & Speed Boat adventures. Get all boating packages on one site',
};

export default function Home() {
  const allHouseboatVariants: ListingItem[] = activities
    .filter(a => a.type === 'houseboat')
    .flatMap(a =>
      (a.variants || []).map(v => ({
        id: v.id,
        title: v.name,
        description: v.description || a.description,
        price: v.price,
        priceUnit: '',
        pricePrefix: 'Starts from',
        image: v.images?.[0]?.src || a.images[0].src, // Use variant's image, fallback to parent
        href: `/book/houseboat/${v.id}`,
        rating: 4.9,
        isGuestFavorite: v.id.includes('luxury') || v.id.includes('premium'),
      }))
    );

  const sharedHouseboatItems = allHouseboatVariants.filter(v => v.id.includes('shared'));
  const privateHouseboatItems = allHouseboatVariants.filter(v => !v.id.includes('shared'));

  const adventureItems: ListingItem[] = activities
    .filter(a => a.type === 'time-based')
    .map(a => ({
      id: a.id,
      title: a.name,
      description: a.description,
      price: a.basePrice,
      priceUnit: '',
      pricePrefix: 'Starts from',
      image: a.images[0].src,
      href: `/${a.id}`,
      rating: 4.7,
    }));

  return (
    <>
      <Navbar />
      <ScrollReveal className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Alleppey Houseboat Booking, Shikara, Kayaking & Speed Boat Packages
          </h1>
        </div>
      </ScrollReveal>
      <Hero
        slides={[
          {
            image: '/images/houseboats/premium-hosueboat-1.jpg',
            title: '',
            subtitle:
              'Book Premium Houseboats, Shikara, Kayak & Speed Boats in Alleppey.',
            buttonText: 'Book Now',
            buttonUrl: '/houseboats',
          },
          {
            image: '/images/shikara/IMG-20250517-WA0011.jpg',
            title: '',
            subtitle:
              'Experience the serene backwaters of Alleppey with our Shikara rides. Glide through the narrow canals and witness the lush greenery and local life.',
            buttonText: 'Book Now',
            buttonUrl: '/shikara',
          },
          {
            image: '/images/kayak/IMG_20241117_080932200_HDR.jpg',
            title: '',
            subtitle:
              'Experience the thrill of adventure with our Kayaking tours. Explore the narrow canals and witness the lush greenery and local life.',
            buttonText: 'Book Now',
            buttonUrl: '/kayak',
          },
          {
            image: '/images/speedboat/hero-2.jpg',
            title: '',
            subtitle:
              'Experience the thrill of adventure with our Speed Boat tours. Explore the narrow canals and witness the lush greenery and local life.',
            buttonText: 'Book Now',
            buttonUrl: '/speedboat',
          }
        ]}
      />
      <BookingListings />
      <ScrollReveal>
        <PackageBuilder />
      </ScrollReveal>

      {/* Houseboats Section */}
      <section className="py-10 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
                Shared Houseboats in Alleppey, Kerala
              </h2>
            </div>
            {/* <a
              href="/houseboats"
              className="text-sm font-bold border-b-2 border-black pb-0.5 hover:text-emerald-600 hover:border-emerald-600 transition-colors"
            >
              View All Stays
            </a> */}
          </div>
        </ScrollReveal>
        <ListingGrid items={sharedHouseboatItems} scrollable={true} />
      </section>

      {/* Houseboats Section */}
      <section className="py-10 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
                Private Houseboats in Alleppey, Kerala
              </h2>
            </div>
            {/* <a
              href="/houseboats"
              className="text-sm font-bold border-b-2 border-black pb-0.5 hover:text-emerald-600 hover:border-emerald-600 transition-colors"
            >
              View All Stays
            </a> */}
          </div>
        </ScrollReveal>
        <ListingGrid items={privateHouseboatItems} scrollable={true} />
      </section>

      {/* Activities Section */}
      <section className="py-16 md:py-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8 px-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <span className="text-orange-600 font-bold tracking-widest text-xs uppercase">
                  Alleppey Backwater Day Trips & Activities
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
                  Shikara, Kayak & Speed Boat Packages
                </h2>
              </div>
            </div>
          </ScrollReveal>
          <ListingGrid items={adventureItems} scrollable={true} />
        </div>
      </section>

      {/* Tourist Places Section */}
      <section className="py-12 md:py-16 bg-white select-none cursor-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-3">
                Places to Visit After Boating
              </h2>
              <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
                Popular sightseeing spots in Alleppey
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((place, i) => (
              <ScrollReveal key={place.id} delay={i * 0.05}>
                <div className="group h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={place.image}
                      alt={place.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-sm font-bold text-white leading-tight drop-shadow-sm">{place.name}</h3>
                    </div>
                  </div>
                  <div className="p-3 flex-grow bg-gray-50/50">
                    <p className="text-[11px] md:text-xs text-gray-600 leading-relaxed line-clamp-4">
                      {place.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        items={[
          {
            q: 'What is the best way to explore Alleppey Backwaters?',
            a: 'It depends on your time and budget. For a complete overnight experience with food, choose a Houseboat Stay. If you have only 2-3 hours and want to see narrow canals, a Shikara Ride or Kayaking is best. For thrill-seekers, we recommend our Speed Boat Cruise.',
          },
          {
            q: 'What is the difference between a Houseboat and a Shikara?',
            a: 'A Houseboat is like a floating hotel with AC bedrooms, toilets, and a kitchen, designed for overnight stays. A Shikara is a smaller, open-roof boat with comfortable seating, perfect for hourly cruises through village canals.',
          },
          {
            q: 'Is it safe for couples, families, children, and elders?',
            a: 'Yes, absolutely. All our boats are Government-licensed and 100% safe for all age groups. We specialize in hosting couples, families with small children, and senior citizens.',
          },
          {
            q: 'Do I need to book in advance?',
            a: 'Yes, we highly recommend booking in advance, especially for Houseboats and Shikara rides during weekends and peak season. Booking online guarantees your reservation and saves you from last-minute high prices.',
          },
          {
            q: 'How do I reach the boarding point?',
            a: 'Our main boarding point is at Finishing Point Road, Alappuzha. It is just 4 km from the Alappuzha Railway Station and 2 km from the KSRTC Bus Stand. We share the exact Google Maps location via WhatsApp once your booking is confirmed.',
          },
        ]}
      />

      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <Footer />
    </>
  );
}
