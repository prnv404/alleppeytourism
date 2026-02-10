import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/home/navbar';
import { Footer } from '@/components/home/footer';
import { PACKAGES } from '@/lib/packages-data';
import { Clock, Users, Star, Check, MapPin, Shield, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Alleppey Kayaking: Sunrise & Sunset Backwater Paddle',
  description:
    'Book the best Kayaking in Alleppey starting @ ₹500. Paddle through narrow backwater canals & villages. Safe for non-swimmers. Sunrise & Sunset slots',
  keywords: ['kayaking alleppey', 'backwater kayaking', 'alleppey adventures'],
  alternates: {
    canonical: '/kayak',
  },
};

export default function KayakPage() {
  const activity = PACKAGES.kayak;


  return (
    <div className="bg-white min-h-screen font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800 tracking-wide uppercase">Adventure Series</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-[1.05]">
            Best Kayaking in <br />
            <span className="text-gray-400">Alleppey.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            Paddle through the silent backwater canals where large houseboats cannot reach. Witness the authentic village life of
            Kuttanad from water level.
          </p>

          <div className="flex flex-wrap gap-4 md:gap-8 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-50">
                <Clock className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Duration</p>
                <p className="font-semibold">2-3 Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gray-50">
                <Users className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Group Size</p>
                <p className="font-semibold">Small Groups</p>
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
        <div className="relative aspect-[4/3] md:aspect-[21/9] w-full rounded-[2rem] overflow-hidden bg-gray-100 shadow-2xl">
          <Image src={activity.images[0].src} alt={activity.images[0].alt} fill className="object-cover" priority sizes="100vw" />
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
              <h2 className="text-3xl font-bold mb-6">Choose Your Session</h2>
              <div className="space-y-4">
                {activity.durations?.map(d => {
                  const price = Math.round(activity.basePrice * d.multiplier);
                  const isPopular = d.id === 'sunrise';
                  return (
                    <div
                      key={d.id}
                      className={`group relative flex items-center justify-between p-6 rounded-xl border transition-all hover:bg-gray-50 ${isPopular ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/10' : 'border-gray-200'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${isPopular ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {d.id === 'sunrise' ? <Sun className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{d.name}</h4>
                          <p className="text-sm text-gray-500">Perfect for photography</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">₹{price}</p>
                          <p className="text-xs text-gray-500">per person</p>
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
              <h2 className="text-3xl font-bold mb-6">Discover Hidden Routes & Untouched Nature</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-6">
                  Escape the crowds and drift into the serene, winding creeks that larger vessels simply cannot reach. This journey takes you deep into the heart of the region, offering a front-row seat to authentic local culture.
                </p>
                <p>
                  On this journey, you will glide through exclusive, narrow passages where the water is calm and the surroundings are silent. Watch farmers tending to paddy fields, spot colorful Kingfishers, and experience the rhythm of the backwaters away from the busy main lake
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="font-bold text-lg mb-4">What's Included</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {[
                  'Premium Kayak & Paddle',
                  'Professional English Guide',
                  'Safety Life Jacket',
                  'Local Tea & Snacks',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>



            {/* Itinerary Section */}
            <div className="py-8 md:py-12 border-b border-gray-100 mb-8 md:mb-12">
              <h3 className="font-bold text-2xl mb-8">Your Morning Adventure</h3>
              <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:h-full before:w-[2px] before:bg-gray-100">
                {[
                  {
                    time: '06:00 AM',
                    title: 'Meet & Greet',
                    desc: 'Meet your guide at the starting point. Quick safety briefing and life jacket fitting.',
                  },
                  {
                    time: '06:15 AM',
                    title: 'Paddle Out',
                    desc: 'Launch into the broad channels as the sun begins to rise.',
                  },
                  {
                    time: '07:00 AM',
                    title: 'Enter the Canals',
                    desc: 'Navigate into the narrow village canals. Silence, birds, and village life.',
                  },
                  {
                    time: '08:00 AM',
                    title: 'Tea Break',
                    desc: 'Stop at a small local tea shop on the banks for chai and snacks (optional).',
                  },
                  {
                    time: '09:00 AM',
                    title: 'Return',
                    desc: 'Paddle back to the finish point with a camera full of memories.',
                  },
                ].map((item, i) => (
                  <div key={i} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-emerald-500 bg-white z-10" />
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">{item.time}</span>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>



            {/* FAQ Section */}
            <div className="mb-12">
              <h3 className="font-bold text-2xl mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {[
                  {
                    q: 'Is it safe for non-swimmers?',
                    a: "Absolutley. Our kayaks are extremely stable sit-on-top models that don't sink. You are also required to wear a high-buoyancy life jacket at all times.",
                  },
                  {
                    q: 'Will I get wet?',
                    a: 'Expect a few splashes from the paddle, so your shorts might get damp. We recommend carrying a change of clothes just in case.',
                  },
                  {
                    q: 'Can kids join?',
                    a: 'Children above 6 years are welcome! They can sit in the front seat of a double kayak with a parent or guide.',
                  },
                  {
                    q: 'Is there a weight limit?',
                    a: 'Our single kayaks support up to 110kg, and double kayaks up to 230kg combined.',
                  },
                  {
                    q: "Is it tiring? Do I need to be fit?",
                    a: "Not at all! We paddle at a very slow, relaxing pace to enjoy the nature. We go with the water current, so it requires very little effort. If you get tired, our guide can tow you!"
                  },
                ].map((faq, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-sm transition-shadow">
                    <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar (Map/Info) */}
          <div className="md:col-span-5 relative">
            <div className="sticky top-24 space-y-8">
              <div className="bg-gray-900 rounded-3xl p-8 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Meeting Point</h3>
                  <p className="text-gray-400 mb-8">Nehru Trophy Finishing Point</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                      <p className="text-sm text-gray-300 leading-relaxed">
                        Reachable by Auto/Taxi. 15 mins from Alleppey Beach, 10 mins from Bus Stand.
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                      <p className="text-sm text-gray-300 leading-relaxed">100% Safety Record. Certified lifeguards on duty.</p>
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

                {/* Decorative bg circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
