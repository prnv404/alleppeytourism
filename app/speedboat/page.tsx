import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { Hero } from '@/components/home/hero';
import { PACKAGES } from '@/lib/packages-data';
import { Clock, Users, Check, MapPin, Zap, Shield, Camera, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/ui/faq-section';

export const metadata: Metadata = {
  title: 'Alleppey Speed Boat Booking: Thrilling Rides from ₹900',
  description: 'Book thrilling Alleppey Speed Boat rides starting @ ₹900. Cruise. Safe, private boats for couples & families. Check availability now',
};

import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function SpeedboatPage() {
  const activity = PACKAGES.speedboat;

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navbar />

      <ScrollReveal className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Alleppey Speed Boat Booking | Punnamada Lake & Village Canal Cruises
          </h1>
        </div>
      </ScrollReveal>

      {/* Standard Hero Section */}
      <div className="mb-8 md:mb-12">
        <Hero
          slides={[
            {
              image: activity.images[0].src,
              title: '',
              subtitle: 'Thrilling Speed Boat rides through Alleppey Backwaters.',
              buttonText: 'Select Your Package',
              buttonUrl: '#rates',
            },
          ]}
        />
      </div>

      {/* High Energy White Grid Section (Pricing) */}
      <div
        id="rates"
        className="bg-white py-12 md:py-16 mb-0 relative overflow-hidden rounded-2xl mx-4 md:mx-6 border border-gray-100 shadow-xl z-20"
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 uppercase mb-3">
              Select Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Speed Boat Package</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base">Choose your duration and intensity level.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {activity.durations?.map(d => {
              // Package specific details
              const details: Record<string, { route: string; distance: string; durationLabel: string; popular?: boolean }> = {
                '1hr': {
                  route:
                    'Starts from Alleppey (2km from town) → boat race track → village narrow canals → kainakary terminal → coconut groves → vembanad lake',
                  distance: '30km',
                  durationLabel: '60 Mins',
                  popular: true,
                },
                '30min': {
                  route: 'Starts from Alleppey → boat race track → vembanad lake → punnamada lake',
                  distance: '15km',
                  durationLabel: '30 Mins',
                },
                '10min': {
                  route: 'Punnamada lake 7Km fun ride',
                  distance: '7km',
                  durationLabel: '10 Mins',
                },
              };

              const detail = details[d.id] || { route: '', distance: '', durationLabel: d.name };
              const isPopular = detail.popular;

              return (
                <div
                  key={d.id}
                  className="group relative flex flex-col h-full bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-900/10"
                >
                  {/* Card Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <Image
                      src={d.image || activity.images[0].src}
                      alt={`${d.name} Speedboat`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />

                    {isPopular && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-lg">
                        Best Value
                      </div>
                    )}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-xl font-black uppercase text-white mb-2 leading-none">{d.name}</h3>
                      <div className="flex items-center gap-3 text-gray-300 text-xs font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-500" /> {detail.durationLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="w-3 h-3 text-emerald-500" /> {detail.distance}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 bg-white">
                    <div className="mb-4 flex-1">
                      <div className="mb-3">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Route</p>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{detail.route}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight truncate">
                          Starts @ ₹{d.minPrice ? d.minPrice.toLocaleString() : '1,000'}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-[10px] text-gray-500 font-bold uppercase whitespace-nowrap">per boat</p>
                          <span className="text-[10px] text-gray-300">•</span>
                          <p className="text-[10px] text-emerald-600 font-bold uppercase whitespace-nowrap">Max 7 Ppl</p>
                        </div>
                      </div>

                      <Button
                        asChild
                        className="shrink-0 bg-black text-white hover:bg-emerald-600 hover:text-white rounded-xl h-10 px-4 sm:px-6 font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-all shadow-lg hover:shadow-emerald-500/20"
                      >
                        <Link href={`/book/${activity.id}`}>Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 1. Feature Banner (Zig Zag) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-32">
        <div className="grid md:grid-cols-2 gap-8 md:gap-24 items-center mb-16 md:mb-24">
          <div className="order-2 md:order-1 space-y-6 md:space-y-8">
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-2">
              Full Throttle
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-gray-900 leading-[0.9]">
              Cover More.
              <br />
              <span className="text-gray-300">Faster.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              Are you ready to explore the Venice of the East at full throttle? Our speed boat in Alleppey offers the perfect blend of thrill and scenic beauty. Unlike slow-moving houseboats, a speed boat cruise lets you cover more ground in less time, taking you deep into the famous Punnamada Lake, alleppey village canals and the vast Vembanad Lake.
            </p>
            <ul className="space-y-3">
              {['Max Speed: 60km/h', 'Licensed Drivers', 'Life Jackets Mandatory'].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-900 font-bold text-sm md:text-base">
                  <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2 relative aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl skew-y-3 md:skew-y-0 md:skew-x-3 transition-transform hover:skew-x-0 duration-500">
            <Image src="/images/hero-2.jpg" alt="Alleppey Speedboat Action" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-24">
          {[
            { icon: Zap, label: 'High Speed', desc: 'Adrenaline pumping' },
            { icon: Camera, label: 'Sightseeing', desc: 'Great photos' },
            { icon: Shield, label: '100% Safe', desc: 'Certified gear' },
            { icon: Anchor, label: 'Anywhere Drop', desc: 'Resort transfer' },
          ].map((h, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 md:p-8 rounded-2xl hover:bg-black hover:text-white group transition-colors duration-300"
            >
              <h.icon className="w-8 h-8 md:w-10 md:h-10 mb-4 text-emerald-600 group-hover:text-emerald-500" />
              <h4 className="font-bold text-lg md:text-xl mb-1">{h.label}</h4>
              <p className="text-xs md:text-sm text-gray-500 group-hover:text-gray-400">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Information & FAQ */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="bg-black text-white rounded-2xl p-8 md:p-12 mb-12 md:mb-16 relative overflow-hidden text-center">
          <div className="relative z-10">
            <MapPin className="w-10 h-10 md:w-12 md:h-12 text-emerald-500 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-2">Boat Jetty Location</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm md:text-base">
              Located near KSRTC Bus Stand. Operates 6 AM - 6 PM.
            </p>
            <Button className="bg-white text-black hover:bg-emerald-600 hover:text-white rounded-xl px-8 font-bold h-12 uppercase">
              Get Directions
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>

        <FaqSection
          items={[
            {
              q: 'What is the price of a speed boat ride in Alleppey?',
              a: 'Our speed boat packages are budget-friendly and charged per boat, not per person. Prices start at ₹900.',
            },
            {
              q: 'What places do we cover in the speed boat cruise?',
              a: 'The route depends entirely on the package you choose. 1-Hour Cruise (Best Value): Covers approximately 30km. You will see the famous Nehru Trophy Boat Race track, cruise into the vast Vembanad Lake, and explore the narrow village canals of Kainakary. 10-Minute Fun Ride: A quick 7km adrenaline rush solely within Punnamada Lake to experience the speed and thrill.',
            },
            {
              q: 'Is the speed boat ride safe for children and seniors?',
              a: 'Yes, absolutely! We provide certified life jackets for all passengers, including special sizes for small children. Our drivers are licensed professionals who prioritize safety. If you have seniors or young kids on board, simply request the captain to maintain a comfortable cruising speed so your family can enjoy the backwaters without the heavy bumps.',
            },
            {
              q: 'Where is the boarding point for the cruise?',
              a: 'Our boats depart from the Finishing Point or Punnamada Lake area, near the KSRTC Bus Stand. We can also arrange a pickup from your lakeside resort if it has a boat jetty. After booking, we will share the exact Google Maps location via WhatsApp.',
            },
            {
              q: 'Do I need to book in advance?',
              a: 'We highly recommend booking in advance, especially on weekends and holidays. Since we operate private boats, waiting times at the jetty can be long (30-60 mins) if you haven\'t reserved a slot. You can book online or call us to reserve your boat instantly.',
            },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
}
