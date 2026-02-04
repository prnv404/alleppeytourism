import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { PACKAGES } from '@/lib/packages-data';
import { Clock, Users, Star, Check, MapPin, Sunset, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaqSection } from '@/components/ui/faq-section';

export const metadata: Metadata = {
  title: 'Alleppey Shikara Boat Ride Booking | Best Village Tours',
  description:
    'Alleppey Shikara Booking starts ₹800/hr. Cruise narrow canals & village backwaters in a private boat. Safe & authentic tour for all ages',
};

export default function ShikaraPage() {
  const activity = PACKAGES.shikara;


  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-10 pb-8 md:pt-24 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-black"></span>
            <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">Cultural Experience</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.05]">
            Alleppey Shikara Ride
          </h1>

          <div className="flex flex-wrap gap-4 md:gap-8 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-50">
                <Clock className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Duration</p>
                <p className="font-semibold">1-4 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-50">
                <Users className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Capacity</p>
                <p className="font-semibold">Max 8 Pax</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-50">
                <Star className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Rating</p>
                <p className="font-semibold">4.9/5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="relative aspect-[4/3] md:aspect-[21/9] w-full rounded-[1rem] overflow-hidden bg-gray-100 shadow-2xl">
          <Image src={activity.images[0]} alt="Shikara Ride" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>



      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-20">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Content */}
          <div className="md:col-span-7 space-y-12">
            {/* Pricing Section - Moved to Top */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Select Your Ride</h2>
              <div className="space-y-4">
                {activity.durations?.map(d => {
                  const price = Math.round(activity.basePrice * d.multiplier);
                  const isPopular = d.id === 'sunset';
                  return (
                    <div
                      key={d.id}
                      className={`group relative flex items-center justify-between p-6 rounded-xl border transition-all hover:bg-gray-50 ${isPopular ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/10' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${isPopular ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {d.id === 'sunset' ? <Sunset className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{d.name}</h4>
                          <p className="text-sm text-gray-500">Fixed price per boat</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{price}</p>
                          <p className="text-xs text-gray-500">max 6 pax</p>
                        </div>
                        <Button
                          asChild
                          size="lg"
                          className={`${isPopular ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gray-900 hover:bg-black'} text-white rounded-lg`}
                        >
                          <Link href={`/book/${activity.id}`}>Book</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose a Shikara Cruise in Alleppey?</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  A Shikara is a traditional open-air canoe designed for the ultimate backwater village experience. Unlike large
                  houseboats, a Shikara is small enough to navigate the narrow canals of Kuttanad, taking you deep into the heart
                  of the village life that bigger boats cannot reach.
                </p>
                <p>
                  It is a mesmerizingly quiet experience. With no loud diesel engine, you enjoy a silent, eco-friendly cruise
                  where you can hear the birds and nature clearly. Equipped with comfortable cushioned seating and a full roof
                  for shade, it offers the perfect blend of relaxation and adventure."
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="font-bold text-lg mb-4">What to Expect</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  'Private Boat for your group',
                  'Cushioned Reclining Seats',
                  'English Speaking Driver',
                  'Village Canal Route',
                  'Stop for Toddy/Lunch (Optional)',
                  '360° Open Views',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Storytelling Section */}
            <div className="py-8 md:py-12 border-y border-gray-100 my-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 order-2 md:order-1">
                  <span className="text-gray-900 font-bold tracking-widest text-xs uppercase">Why We Recommend the Sunrise Ride (6:00 AM)</span>
                  <h3 className="text-3xl font-bold leading-tight">
                    Experience the magic of Alleppey <br />
                    <span className="text-gray-400">before the world wakes up.</span>
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
                    Our sunrise Shikara rides take you through the mist-covered backwaters where you can see village children going to school by boat and local fishermen casting nets. This 6 AM to 9 AM slot offers the best lighting for photography and silence for nature lovers
                  </p>
                </div>
                <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden order-1 md:order-2">
                  <Image src="/images/hero-3.jpg" alt="Village Life" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Route Highlights
            <div className="py-8 md:py-12 border-b border-gray-100 mb-8 md:mb-12">
              <h3 className="font-bold text-2xl mb-8">On the Route</h3>
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { title: 'Kuttanad Canals', desc: 'Narrow waterways lined with homes and paddy fields.' },
                  {
                    title: 'Chavara Bhavan',
                    desc: 'Ancestral home of Saint Kuriakose Elias Chavara, accessed by boat.',
                  },
                  { title: 'Paddy Fields', desc: 'Famous farming below sea level, a unique agricultural wonder.' },
                  { title: 'Toddy Shops', desc: 'Optional stop to taste local palm wine and spicy duck roast.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Shikara vs Houseboat */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-8 md:mb-16 overflow-hidden">
              <h3 className="font-bold text-xl mb-6">Shikara vs Houseboat</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-4 font-bold text-gray-500 uppercase tracking-wider text-xs">Feature</th>
                      <th className="pb-4 font-bold text-gray-900 pl-4">Shikara</th>
                      <th className="pb-4 font-bold text-gray-400 pl-4">Houseboat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { feat: 'Access', s: 'Narrow Canals', h: 'Main Lake Only' },
                      { feat: 'Privacy', s: 'Total Privacy', h: 'May be shared' },
                      { feat: 'Cost', s: 'Budget Friendly', h: 'Premium' },
                      { feat: 'Duration', s: 'Hourly (1-5 Hrs)', h: 'Overnight (20 Hrs)' },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="py-4 font-medium text-gray-600">{row.feat}</td>
                        <td className="py-4 font-bold text-emerald-700 pl-4">{row.s}</td>
                        <td className="py-4 text-gray-500 pl-4">{row.h}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQ Section */}
            {/* FAQ Section */}
            <FaqSection
              title="Frequently Asked Questions"
              className="px-0 py-0 mb-12"
              items={[
                {
                  q: 'Is there a toilet on the Shikara boat?',
                  a: 'Most standard Shikaras are open-air canoes and do not have toilets on board. However, for rides longer than 2 hours, we can stop at clean riverside restaurants or toddy shops for restroom breaks.',
                },
                {
                  q: 'Will I get wet if it rains?',
                  a: 'No. All our Shikaras are equipped with a roof and side curtains that can be rolled down instantly. You stay completely dry while enjoying the romantic view of the rain on the backwaters.',
                },
                {
                  q: 'Can we order food during the Shikara ride?',
                  a: 'Food is not cooked on board (unlike houseboats). However, we can stop at famous local toddy shops or riverside restaurants where you can buy fresh duck roast, karimeen fry, and tapioca during the cruise.',
                },
                {
                  q: 'Is the Shikara ride safe for elders and kids?',
                  a: 'Yes. The water in the canals is very calm (no waves), and the boat is stable with comfortable seating. We provide life jackets for children and non-swimmers to ensure extra safety.',
                },
              ]}
            />
          </div>

          {/* Right Sticky Sidebar (Map/Info) */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-24 space-y-8">
              <div className="bg-gray-900 rounded-3xl p-8 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Departures</h3>
                  <p className="text-gray-400 mb-8">Finishing Point Jetty</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                      <p className="text-sm text-gray-300 leading-relaxed">Centrally located with ample parking.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <Heart className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                      <p className="text-sm text-gray-300 leading-relaxed">Perfect for couples and small families.</p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="
                                            w-full 
                                            bg-white 
                                            text-black 
                                            hover:bg-gray-100 
                                            hover:text-black 
                                        "
                  >
                    <a href="tel:+919567296056">Call Now</a>
                  </Button>
                </div>
              </div>

              {/* <div className="relative aspect-square rounded-3xl overflow-hidden">
                                <Image src="/images/hero-2.jpg" alt="Atmosphere" fill className="object-cover" />
                            </div> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
