import { Metadata } from 'next';
import { activities, PACKAGES } from '@/lib/packages-data';
import { ActivityDetail } from '@/components/booking/activity-detail';
import { Navbar } from '@/components/home/navbar';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

// Only generate static params for time-based activities (not houseboats)
const timeBasedActivities = activities.filter(a => a.type === 'time-based');

export async function generateStaticParams() {
  return timeBasedActivities.map(activity => ({
    id: activity.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const activity = PACKAGES[id];

  if (!activity || activity.type === 'houseboat') {
    return {
      title: 'Activity Not Found | Alleppey Tourism',
    };
  }

  const titles: Record<string, string> = {
    shikara: 'Book Shikara Ride in Alleppey | Village Backwater Tours',
    kayak: 'Book Kayaking in Alleppey | Sunrise & Sunset Tours',
    speedboat: 'Book Speed Boat Ride in Alleppey | Thrilling Adventures',
  };

  const descriptions: Record<string, string> = {
    shikara: 'Book a traditional Shikara boat ride in Alleppey. Explore narrow canals and village backwaters. 1, 2 & 3-hour packages available.',
    kayak: 'Book kayaking in Alleppey backwaters. Sunrise and sunset slots available. Safe for beginners and non-swimmers. Best adventure activity.',
    speedboat: 'Book an exciting speedboat ride in Alleppey. 10-min, 30-min & 1-hour packages. Perfect for thrill-seekers and families.',
  };

  return {
    title: titles[id] || `Book ${activity.name} | Alleppey Tourism`,
    description: descriptions[id] || activity.description,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: titles[id] || `Book ${activity.name} | Alleppey Tourism`,
      description: descriptions[id] || activity.description,
      type: 'website',
      images: [activity.images[0]],
    },
  };
}

export default async function BookingPage({ params }: PageProps) {
  const { id } = await params;

  // Redirect houseboats to the new clean URL structure
  if (id === 'houseboat') {
    redirect('/book/houseboat/shared-standard');
  }

  const activity = PACKAGES[id];

  if (!activity) {
    notFound();
  }

  return (
    <>
      <Navbar className="hidden md:block" />
      <ActivityDetail activity={activity} />
    </>
  );
}
