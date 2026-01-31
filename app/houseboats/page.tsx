import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { Hero } from '@/components/home/hero';
import { PACKAGES } from '@/lib/packages-data';
import { Check, Star, Users, Coffee, Anchor, Shield, ArrowRight, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/ui/faq-section';

export const metadata: Metadata = {
  title: 'Alleppey Boat House Rates | Budget to Luxury Kerala Boats',
  description:
    'Explore the best Alleppey Boat House rates for every budget. Choose from Budget AC, Deluxe, or Luxury Premium boats. View packages & book direct today',
};

export default function HouseboatsPage() {
  const houseboatActivity = PACKAGES.houseboat;

  const allHouseboats = (houseboatActivity.variants || []).map(v => ({
    ...v,
    parentImage: houseboatActivity.image,
    parentId: houseboatActivity.id,
    parentDesc: houseboatActivity.description,
  }));


  const privateBoats = allHouseboats.filter(h => !h.name.toLowerCase().includes('shared'));
  const sharedBoats = allHouseboats.filter(h => h.name.toLowerCase().includes('shared'));

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* SEO Header & Category Selection */}
      {/* Hero Section */}
      <div className="pt-16 md:pt-20">
        <Hero
          slides={[
            {
              image: '/images/hero-3.jpg',
              title: 'Alleppey Boat House Booking',
              subtitle: 'Explore the best Alleppey Boat House rates for every budget. Choose from Budget AC, Deluxe, or Luxury Premium boats. View packages & book direct today',
              buttonText: 'View Houseboats',
              buttonUrl: '#private',
            },
          ]}
        />
      </div>

      {/* Shared Listings */}
      <section id="shared" className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2">Shared Houseboats</h2>
            <p className="text-gray-500 text-sm">Budget friendly social stays.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sharedBoats.map(boat => (
            <div
              key={boat.id}
              className="group flex flex-col h-full bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300"
            >
              {/* Image & Price Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={boat.parentImage}
                  alt={boat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-lg border border-white/10">
                  <div className="text-xs text-gray-300 font-medium uppercase tracking-wider text-right">Per Person</div>
                  <div className="text-xl font-black leading-none">₹{boat.price.toLocaleString()}</div>
                </div>
                <div className="absolute bottom-4 left-4 bg-amber-400 text-black px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-md">
                  <Users className="w-3 h-3" /> Shared Stay
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight">{boat.name}</h3>

                {/* High Visibility Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Shield className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-700">Private Room</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Zap className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-gray-700">AC Bedroom</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Coffee className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-gray-700">All Meals</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-gray-700">Social Deck</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full bg-black hover:bg-emerald-600 text-white rounded-2xl h-12 font-bold shadow-lg shadow-gray-200 group-hover:shadow-emerald-200 transition-all"
                  >
                    <Link href={`/book/${boat.parentId}?variant=${boat.id}`}>
                      Book Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">
                    Free Cancellation • Instant Confirmation
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Private Listings */}
      <section id="private" className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2">Private Collection</h2>
            <p className="text-gray-500 text-sm">Exclusive boats for your group.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {privateBoats.map(boat => (
            <div
              key={boat.id}
              className="group flex flex-col h-full bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl hover:border-emerald-500/30 transition-all duration-300"
            >
              {/* Image & Price Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={boat.parentImage}
                  alt={boat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl shadow-xl border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-right mb-0.5">Starts at</div>
                  <div className="text-2xl font-black text-emerald-600 leading-none tracking-tight">₹{boat.price.toLocaleString()}</div>
                </div>
                <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 shadow-md">
                  <Star className="w-3 h-3 fill-white" /> 4.9 (128)
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight">{boat.name}</h3>

                {/* High Visibility Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-gray-700">1-3 Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-gray-700">AC Bedroom</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Coffee className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-gray-700">All Meals</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <Anchor className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-gray-700">Private Boat</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <Button
                    asChild
                    className="w-full bg-black hover:bg-emerald-600 text-white rounded-2xl h-12 font-bold shadow-lg shadow-gray-200 group-hover:shadow-emerald-200 transition-all"
                  >
                    <Link href={`/book/${boat.parentId}?variant=${boat.id}`}>
                      Book Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <p className="text-[10px] text-center text-gray-400 mt-3 font-medium">
                    Free Cancellation • Instant Confirmation
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Story Section */}
      <section className="bg-gray-100 py-12 md:py-16 mb-12 md:mb-20 rounded-3xl mx-4 md:mx-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-emerald-600 mb-2">
              <Zap className="w-6 h-6 fill-current" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              Experience <span className="text-emerald-600">Premium</span>
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Our houseboats aren't just transport. They are floating luxury hotels. With dedicated chefs, ensuite bathrooms, and
              premium bedding, we ensure your stay is as comfortable as it is memorable.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <Coffee className="w-8 h-8 text-amber-500 mb-3" />
              <h4 className="font-bold text-gray-900">Fresh Food</h4>
              <p className="text-xs text-gray-500 mt-1">Cooked on board</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <Shield className="w-8 h-8 text-blue-500 mb-3" />
              <h4 className="font-bold text-gray-900">Safe & Secure</h4>
              <p className="text-xs text-gray-500 mt-1">Verified Experience</p>
            </div>
          </div>
        </div>
      </section>



      <FaqSection
        title="Common Questions"
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
            a: 'No. As per Government safety regulations, all houseboats must anchor (park) by 5:30 PM. They remain docked until 8:00 AM the next morning. This is the perfect time to enjoy the sunset, take a village walk, or relax on the deck. The cruise resumes in the morning for breakfast.',
          },
          {
            q: 'What is the standard Check-in and Check-out time?',
            a: `Check-in: 12:00 PM (Noon). We recommend arriving on time to maximize your cruising hours.
Check-out: 09:00 AM the next morning, after breakfast.`,
          },
        ]}
      />

      <Footer />
    </div>
  );
}
