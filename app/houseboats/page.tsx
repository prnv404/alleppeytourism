import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { Hero } from '@/components/home/hero';
import { PACKAGES } from '@/lib/packages-data';
import { Check, Star, Users, Coffee, Anchor, Shield, ArrowRight, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Houseboats in Alleppey | Private & Shared Stays',
  description:
    'Book premium private houseboats or budget-friendly shared stays in Alleppey backwaters. Experience the Venice of the East.',
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
              title: 'Living on The Backwaters',
              subtitle: 'Wake up to the sound of water lapping against your window. Experience the timeless charm of Alleppey.',
              buttonText: 'View Houseboats',
              buttonUrl: '#private',
            },
          ]}
        />
      </div>

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
                      Check Availability <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

      {/* Shared Listings */}
      <section id="shared" className="max-w-7xl mx-auto px-6 mb-12 md:mb-20 scroll-mt-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black mb-2">Shared Experiences</h2>
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
                <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight truncate">{boat.name}</h3>

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
                      Check Availability <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 mb-12 md:mb-20">
        <h2 className="text-2xl font-black text-center mb-8">Common Questions</h2>
        <div className="grid gap-4">
          {[
            {
              q: 'Is food included in the price?',
              a: 'Yes! All meals (Lunch, Tea/Snacks, Dinner, Breakfast) are included in the package. The cuisine is authentic Kerala style.',
            },
            {
              q: 'What is the check-in time?',
              a: 'Standard check-in is at 12:00 PM and check-out is at 09:00 AM the next morning.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors">
              <h4 className="font-bold text-sm mb-1 text-gray-900">{item.q}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
