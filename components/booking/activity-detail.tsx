'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Activity, activities } from '@/lib/packages-data';
import { calculateTotalPrice, getAddonPrice } from '@/lib/pricing-utils';
import { useSearchParams } from 'next/navigation';
import { ListingGrid, ListingItem } from '@/components/ui/listing-grid';

import { Navbar } from '@/components/home/navbar';
import { ActivityHero } from './detail/activity-hero';

import { ActivityHighlights } from './detail/activity-highlights';
import { ActivityInfo } from './detail/activity-info';
import { MobileSelectionSection } from './detail/mobile-selection-section';

import { BookingWidget } from './detail/booking-widget';
import { MobileBottomBar } from './detail/mobile-bottom-bar';
import { StayType } from './detail/shared';

interface ActivityDetailProps {
  activity: Activity;
}

export function ActivityDetail({ activity }: ActivityDetailProps) {
  const searchParams = useSearchParams();
  const paramVariant = searchParams.get('variant');
  const paramDuration = searchParams.get('duration');

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    paramVariant || (activity.variants ? activity.variants[0].id : '')
  );
  const [selectedDurationId, setSelectedDurationId] = useState<string | null>(paramDuration || null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [peopleCount, setPeopleCount] = useState(2);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [stayType, setStayType] = useState<StayType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(true);

  // Scroll listener for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide mobile bar when scrolled to "Explore More" section
  useEffect(() => {
    const handleScroll = () => {
      const exploreSection = document.getElementById('explore-more-section');
      if (exploreSection) {
        const rect = exploreSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
        setShowMobileBar(!isVisible);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset loading state when user returns to the page (e.g., back from checkout)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setIsLoading(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Helper for selected variant/duration details
  const selectedVariant = activity.variants?.find(v => v.id === selectedVariantId);
  const selectedDuration = selectedDurationId ? activity.durations?.find(d => d.id === selectedDurationId) : null;

  // Calculate Price
  const currentPrice = calculateTotalPrice({
    activity,
    selectedVariantId,
    selectedDurationId,
    stayType,
    peopleCount,
    selectedAddons,
  });

  const handleWhatsAppClick = () => {
    // Validation
    if (activity.type === 'houseboat' && !stayType) {
      alert('Please select a Cruise Type (Overnight, Day, etc).');
      // Highlight section logic could go here
      return;
    }
    if (activity.type === 'time-based' && !selectedDurationId) {
      alert('Please select a Duration.');
      return;
    }

    let message = `Hi Alleppey Tourism! 👋\nI'm interested in booking: *${activity.name}*\n`;

    if (activity.type === 'houseboat' && stayType) {
      const v = activity.variants?.find(x => x.id === selectedVariantId);
      message += `*Type:* ${v?.name}\n`;
      const cruiseType = v?.cruiseTypes?.find(ct => ct.id === stayType);
      message += `*Cruise:* ${cruiseType?.label || stayType}\n`;
    } else if (selectedDuration) {
      message += `*Duration:* ${selectedDuration.name}\n`;
    }

    message += `*Guests:* ${peopleCount}\n`;

    if (selectedAddons.length > 0) {
      message += `\n*Added Extras:*\n`;
      selectedAddons.forEach(addonId => {
        const addon = activities.find(a => a.id === addonId);
        if (addon) message += `+ ${addon.name} (Just Added)\n`;
      });
    }

    if (!date) {
      alert('Please select a travel date to check availability.');
      return;
    }

    if (date) {
      message += `\n*Date:* ${format(date, 'PPP')}\n`;
    }

    message += `\n*Total Estimated Price:* ₹${currentPrice.toLocaleString()}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/919567296056?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handlePayment = async () => {
    // Validation for payment
    if (activity.type === 'houseboat' && !stayType) {
      alert('Please select a Cruise Type (Overnight, Day, etc).');
      return;
    }
    if (activity.type === 'time-based' && !selectedDurationId) {
      alert('Please select a Duration.');
      return;
    }
    if (!date) {
      alert('Please select a travel date.');
      return;
    }

    setIsLoading(true);

    try {
      // Calculate 25% advance payment in paise (smallest currency unit)
      // currentPrice is in rupees, so multiply by 100 to convert to paise
      // Then take 25% of that amount
      const advanceAmountInPaise = Math.round(currentPrice * 100 * 0.25);

      // Create product with 25% advance amount
      const productResponse = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: activity.name,
          description: activity.description,
          price: advanceAmountInPaise,
          currency: 'INR',
          type: activity.type,
          stayType: stayType,
          variantId: selectedVariantId,
          durationId: selectedDurationId,
          addons: selectedAddons,
          peopleCount: peopleCount,
          date: date ? date.toISOString() : '',
        }),
      });

      if (!productResponse.ok) {
        const errorData = await productResponse.json();
        throw new Error(errorData.error || 'Product creation failed');
      }
      const productData = await productResponse.json();
      console.log('Product Created:', productData);

      const productId = productData.product_id || productData.id;
      if (!productId) {
        throw new Error('Product ID missing in response');
      }

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_cart: [
            {
              product_id: productId,
              quantity: 1,
            },
          ],
          payment_link: true,
          billing_currency: 'INR',
          billing: {
            city: 'Alleppey',
            country: 'IN',
            state: 'Kerala',
            street: 'Boat Jetty',
            zipcode: '688001',
          },
          metadata: {
            date: date ? date.toISOString() : '',
            variant: selectedVariantId,
            duration: selectedDurationId,
            productName: activity.name,
            amount: advanceAmountInPaise.toString(),
          },
        }),
      });

      console.log(response);

      if (!response.ok) throw new Error('Payment creation failed');

      const data = await response.json();
      if (data.checkout_url || data.url || data.payment_link) {
        window.location.href = data.checkout_url || data.url || data.payment_link;
      } else {
        console.error('No payment link returned', data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Payment error', error);
      alert('Could not initiate payment. Please try again.');
      setIsLoading(false);
    }
  };

  // Filter available add-ons (exclude current activity)
  const availableAddons = activities.filter(a => a.id !== activity.id);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => (prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]));
  };

  // Prepare cross-sell items (All items flattened)
  const crossSellItems: ListingItem[] = activities.flatMap(act => {
    if (act.type === 'houseboat' && act.variants) {
      return act.variants.map(v => ({
        id: v.id,
        title: v.name,
        description: v.description || act.description,
        price: v.price,
        priceUnit: '/ night',
        image: act.image,
        href: `/book/houseboat?variant=${v.id}`,
        rating: 4.8,
      }));
    }
    return [
      {
        id: act.id,
        title: act.name,
        description: act.description,
        price: act.basePrice,
        priceUnit: '/ trip',
        image: act.image,
        href: `/houseboats/book/${act.id}`,
        rating: 4.7,
      },
    ];
  });

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 md:pb-12 pt-20 md:pt-24 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 md:pt-8 min-h-screen">
        {/* Full Width Hero Section */}
        <ActivityHero activity={activity} title={selectedVariant?.name} />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative px-4 md:px-0">
          {/* Left Column: Info */}
          <div className="flex-1 w-full">
            {/* Content Container */}
            <div className="relative z-10 bg-white rounded-t-[1.5rem] md:rounded-none py-6 md:p-0">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6 md:hidden" />

              <div className="space-y-8 md:space-y-12">
                <MobileSelectionSection
                  activity={activity}
                  selectedVariantId={selectedVariantId}
                  setSelectedVariantId={setSelectedVariantId}
                  selectedDurationId={selectedDurationId}
                  setSelectedDurationId={setSelectedDurationId}
                  peopleCount={peopleCount}
                  setPeopleCount={setPeopleCount}
                  date={date}
                  setDate={setDate}
                  availableAddons={availableAddons}
                  selectedAddons={selectedAddons}
                  toggleAddon={toggleAddon}
                  getAddonPrice={getAddonPrice}
                  stayType={stayType}
                  setStayType={setStayType}
                />

                <ActivityHighlights specs={selectedVariant?.specs || activity.specs} features={activity.features} />

                <ActivityInfo activity={activity} description={selectedVariant?.description} />
              </div>
            </div>
          </div>

          {/* Right Column: Desktop Booking Widget */}
          <BookingWidget
            activity={activity}
            peopleCount={peopleCount}
            setPeopleCount={setPeopleCount}
            date={date}
            setDate={setDate}
            selectedVariantId={selectedVariantId}
            setSelectedVariantId={setSelectedVariantId}
            selectedDurationId={selectedDurationId}
            setSelectedDurationId={setSelectedDurationId}
            availableAddons={availableAddons}
            selectedAddons={selectedAddons}
            toggleAddon={toggleAddon}
            getAddonPrice={getAddonPrice}
            currentPrice={currentPrice}
            handleWhatsAppClick={handleWhatsAppClick}
            handlePayment={handlePayment}
            isLoading={isLoading}
            stayType={stayType}
            setStayType={setStayType}
          />
        </div>
      </main>

      <MobileBottomBar
        peopleCount={peopleCount}
        currentPrice={currentPrice}
        activityName={activity.name}
        activityId={activity.id}
        date={date}
        handleWhatsAppClick={handleWhatsAppClick}
        handlePayment={handlePayment}
        isLoading={isLoading}
        showMobileBar={showMobileBar}
      />
    </div>
  );
}
