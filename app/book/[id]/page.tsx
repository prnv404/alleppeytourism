import { activities } from "@/lib/packages-data";
import { ActivityDetail } from "@/components/booking/activity-detail";
import { Navbar } from "@/components/home/navbar";
import { notFound } from "next/navigation";
import { Footer } from "@/components/home/footer";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return activities.map((activity) => ({
        id: activity.id,
    }));
}

export default async function BookingPage({ params }: PageProps) {
    const { id } = await params;
    const activity = activities.find((a) => a.id === id);

    if (!activity) {
        notFound();
    }

    return (
        <>
            <Navbar className="hidden md:block" />
            <ActivityDetail activity={activity} />
            <Footer />
        </>
    );
}
