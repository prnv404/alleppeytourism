import Image from "next/image";
import { Navbar } from "@/components/home/navbar";
import { WhatsAppButton } from "@/components/ui/button/whatsapp";
import { Hero } from "@/components/home/hero";
import { BookingListings } from "@/components/home/listing";
import { Footer } from "@/components/home/footer";
import { Testimonials } from "@/components/home/testimonial";
import { PackageBuilder } from "@/components/home/packages";
import ElevenLabsWidget from "@/components/shared/eleven-labs-widget";

export default function Home() {
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
            buttonUrl: "/book/houseboat",
          },
          {
            image: "/images/hero-2.jpg",
            title: "Alleppey Backwaters",
            subtitle: "Explore the serene backwaters and lush greenery of Alleppey.",
            buttonText: "Learn More",
            buttonUrl: "/book/shikara",
          },
          {
            image: "/images/hero-3.jpg",
            title: "Alleppey Houseboats",
            subtitle: "Relax and rejuvenate on our premium houseboats.",
            buttonText: "View Packages",
            buttonUrl: "/book/kayak",
          },
        ]}
      />
      <BookingListings />
      <PackageBuilder />

      <Testimonials />
      <Footer />
      <ElevenLabsWidget />
    </>
  );
}
