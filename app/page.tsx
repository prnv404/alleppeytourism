import Image from "next/image";
import { Navbar } from "@/components/home/navbar";
import { WhatsAppButton } from "@/components/ui/button/whatsapp";
import { Hero } from "@/components/home/hero";
import { BookingListings } from "@/components/home/listing";
import { Footer } from "@/components/home/footer";
import { Testimonials } from "@/components/home/testimonial";
import { PackageBuilder } from "@/components/home/packages";
import ElevenLabsWidget from "@/components/shared/eleven-labs-widget";

import { ListingGrid, ListingItem } from "@/components/ui/listing-grid";
import { activities } from "@/lib/packages-data";

export default function Home() {
  const houseboatItems: ListingItem[] = activities
    .filter(a => a.type === "houseboat")
    .flatMap(a => (a.variants || []).map(v => ({
      id: v.id,
      title: v.name,
      description: v.description || a.description,
      price: v.price,
      priceUnit: "/ night",
      image: a.image,
      href: `/book/${a.id}?variant=${v.id}`,
      rating: 4.9,
      isGuestFavorite: v.id === 'luxury' || v.id === 'deluxe'
    })));

  const adventureItems: ListingItem[] = activities
    .filter(a => a.type === "time-based")
    .map(a => ({
      id: a.id,
      title: a.name,
      description: a.description,
      price: a.basePrice,
      priceUnit: "/ trip",
      image: a.image,
      href: `/book/${a.id}`,
      rating: 4.7
    }));

  return (
    <>
      <Navbar />
      <Hero
        slides={[
          {
            image: "/images/hero-1.jpg",
            title: "Experience the Magic of Alleppey",
            subtitle: "Discover the Venice of the East with our luxurious houseboat cruises.",
            buttonText: "Book Now",
            buttonUrl: "/houseboats",
          },
          {
            image: "/images/hero-2.jpg",
            title: "Alleppey Backwaters",
            subtitle: "Explore the serene backwaters and lush greenery of Alleppey.",
            buttonText: "Learn More",
            buttonUrl: "/shikara",
          },
          {
            image: "/images/hero-3.jpg",
            title: "Alleppey Houseboats",
            subtitle: "Relax and rejuvenate on our premium houseboats.",
            buttonText: "View Packages",
            buttonUrl: "/kayak",
          },
        ]}
      />
      <BookingListings />
      <PackageBuilder />

      {/* Houseboats Section */}
      <section className="py-10 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <span className="text-emerald-600 font-bold tracking-widest text-xs uppercase">Stay on the Water</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">Premium Houseboats</h2>
          </div>
          <a href="/houseboats" className="text-sm font-bold border-b-2 border-black pb-0.5 hover:text-emerald-600 hover:border-emerald-600 transition-colors">
            View All Stays
          </a>
        </div>
        <ListingGrid items={houseboatItems} />
      </section>

      {/* Activities Section */}
      <section className="py-16 md:py-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto md:px-6 lg:px-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <span className="text-orange-600 font-bold tracking-widest text-xs uppercase">Day Cruises & Rides</span>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">Activities & Adventures</h2>
            </div>
          </div>
          <ListingGrid items={adventureItems} />
        </div>
      </section>

      <Testimonials />
      <Footer />
      <ElevenLabsWidget />
    </>
  );
}
