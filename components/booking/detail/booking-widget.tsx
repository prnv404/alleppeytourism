'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Minus, Plus, Calendar as CalendarIcon, Check, Star, Lock, Loader2, Phone } from 'lucide-react';
import { Activity } from '@/lib/packages-data';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { WhatsAppIcon, StayType } from './shared';

interface BookingWidgetProps {
  activity: Activity;
  peopleCount: number;
  setPeopleCount: (count: number) => void;
  childCount: number;
  setChildCount: (count: number) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedVariantId: string;
  setSelectedVariantId: (id: string) => void;
  selectedDurationId: string | null;
  setSelectedDurationId: (id: string) => void;
  availableAddons: Activity[];
  selectedAddons: string[];
  toggleAddon: (id: string) => void;
  getAddonPrice: (addon: Activity) => number;
  currentPrice: number;
  handleWhatsAppClick: () => void;
  handlePayment: () => void;
  isLoading: boolean;
  stayType: StayType | null;
  setStayType: (type: StayType) => void;
}

export function BookingWidget({
  activity,
  peopleCount,
  setPeopleCount,
  childCount,
  setChildCount,
  date,
  setDate,
  selectedVariantId,
  setSelectedVariantId,
  selectedDurationId,
  setSelectedDurationId,
  availableAddons,
  selectedAddons,
  toggleAddon,
  getAddonPrice,
  currentPrice,
  handleWhatsAppClick,
  handlePayment,
  isLoading,
  stayType,
  setStayType,
}: BookingWidgetProps) {
  const [isDesktopCalendarOpen, setIsDesktopCalendarOpen] = useState(false);
  const isShared = selectedVariantId?.includes('shared');
  const totalGuests = peopleCount + childCount;

  // Smart Sticky Logic
  const widgetRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState('6rem'); // Default to top-24 (6rem)

  useEffect(() => {
    const updateStickyPosition = () => {
      if (!widgetRef.current) return;
      const widgetHeight = widgetRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // If widget fits in viewport (with some buffer), stick to top
      if (widgetHeight < viewportHeight - 120) {
        setStickyTop('6rem');
      } else {
        // If widget is taller, stick such that bottom is visible
        // top = viewport - widgetHeight - padding (e.g. 24px)
        const offset = viewportHeight - widgetHeight - 24;
        setStickyTop(`${offset}px`);
      }
    };

    // Observer for widget resize (internal content changes)
    const resizeObserver = new ResizeObserver(updateStickyPosition);
    if (widgetRef.current) {
      resizeObserver.observe(widgetRef.current);
    }

    // Listener for window resize
    window.addEventListener('resize', updateStickyPosition);

    // Initial call
    updateStickyPosition();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateStickyPosition);
    };
  }, [peopleCount, childCount, stayType, date, selectedAddons]); // Re-calc on state changes that affect height

  return (
    <div
      ref={widgetRef}
      style={{ top: stickyTop }}
      className="hidden lg:block lg:w-[380px] lg:shrink-0 transition-[top] duration-300 z-20 sticky h-fit"
    >
      <div className="">
        <div className="bg-white rounded-[1rem] shadow-xl border border-gray-100 p-6 ring-1 ring-gray-900/5">
          {/* Header: Price & Badge */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                {currentPrice > 0 ? (
                  <span className="text-4xl font-black text-emerald-600 tracking-tight">₹{currentPrice.toLocaleString()}</span>
                ) : (
                  <span className="text-3xl text-gray-400">Select Option</span>
                )}
              </h2>
              <p className="text-sm font-medium text-gray-500 mt-1">
                {activity.type === 'houseboat' ? `per boat / ${stayType === 'day' ? 'cruise' : 'night'}` : 'per person'}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-xs font-bold text-amber-700">New</span>
            </div>
          </div>

          {/* Select Experience (Pills) */}
          {activity.type === 'houseboat' ? (
            <div className="mb-6">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">
                Select Experience
              </label>
              <div className="flex gap-2">
                {(() => {
                  const v = activity.variants?.find(v => v.id === selectedVariantId);
                  return v?.cruiseTypes?.map(ct => {
                    const type = ct.id as StayType;
                    return (
                      <button
                        key={type}
                        onClick={() => setStayType(type)}
                        className={cn(
                          'flex-1 py-2.5 px-2 rounded-full text-xs font-bold transition-all border',
                          stayType === type
                            ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                        )}
                      >
                        {type === 'overnight' ? 'Overnight' : ct.label}
                      </button>
                    );
                  });
                })()}
              </div>
            </div>
          ) : (
            /* Duration Pills for other activities */
            <div className="mb-6">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 block">
                Select Duration <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {activity.durations?.map(duration => (
                  <button
                    key={duration.id}
                    onClick={() => setSelectedDurationId(duration.id)}
                    className={cn(
                      'px-4 py-2 rounded-full text-xs font-bold border transition-all',
                      selectedDurationId === duration.id
                        ? 'border-emerald-500 text-emerald-700 bg-emerald-50'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
                    )}
                  >
                    {duration.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Check-In Section */}
          <div className="mb-4">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 block">Check-In</label>
            <Popover open={isDesktopCalendarOpen} onOpenChange={setIsDesktopCalendarOpen}>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border bg-gray-50/50 hover:bg-white hover:border-emerald-500 transition-all text-left group',
                    !date ? 'border-gray-200' : 'border-gray-300'
                  )}
                >
                  <CalendarIcon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  <span className={cn('text-base font-medium', !date && 'text-gray-400')}>
                    {date ? format(date, 'dd MMM yyyy') : 'Select Date'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={d => {
                    setDate(d);
                    setIsDesktopCalendarOpen(false);
                  }}
                  disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className="rounded-lg border shadow-lg"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests Section */}
          <div className="mb-8 p-4 border border-gray-200 rounded-xl bg-white">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 block">Guests</label>

            {/* Adults Row */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-medium text-gray-900">Adults</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
                  disabled={peopleCount <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-4 text-center text-sm font-bold text-gray-900">{peopleCount}</span>
                <button
                  onClick={() => setPeopleCount(peopleCount + 1)}
                  disabled={activity.maxGuests ? peopleCount >= activity.maxGuests : false}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 disabled:opacity-30 disabled:border-gray-200 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            {activity.maxGuests && (
              <p className="text-[10px] text-amber-600 font-bold mt-2 text-right">Max {activity.maxGuests} guests allowed</p>
            )}

            {/* Children Row */}
            {activity.id !== 'shikara' && (
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-base font-medium text-gray-900 block">Children</span>
                  <span className="text-[10px] text-gray-400 font-medium">Below 5 (Free)</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChildCount(Math.max(0, childCount - 1))}
                    disabled={childCount <= 0}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 disabled:opacity-30 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-4 text-center text-sm font-bold text-gray-900">{childCount}</span>
                  <button
                    onClick={() => setChildCount(childCount + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-900 transition-colors disabled:opacity-30 disabled:border-gray-200"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Enhance Your Stay (Previous Design) */}
          {availableAddons.length > 0 && (
            <div className="mb-6">
              <label className="text-xs font-bold text-gray-900 mb-3 block">Enhance your stay</label>
              <div className="space-y-2">
                {availableAddons.slice(0, 3).map(addon => (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={cn(
                      'group flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border',
                      selectedAddons.includes(addon.id)
                        ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500'
                        : 'bg-white border-gray-200 hover:border-emerald-200'
                    )}
                  >
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={addon.images[0].src} alt={addon.images[0].alt} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900 leading-tight mb-0.5">{addon.name}</div>
                      <div className="text-xs text-gray-500 font-medium">₹{getAddonPrice(addon).toLocaleString()}</div>
                    </div>
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
                        selectedAddons.includes(addon.id)
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-gray-300 bg-white group-hover:border-emerald-400'
                      )}
                    >
                      {selectedAddons.includes(addon.id) && <Check className="w-3 h-3 stroke-[4px]" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Book Buttons */}
          <div className="flex gap-2">
            <a
              href="tel:+919947753154"
              className="bg-white hover:bg-emerald-50 text-gray-900 border border-gray-200 hover:border-emerald-300 h-14 w-14 rounded-xl flex items-center justify-center shadow-sm shrink-0 transition-all group"
              title="Call Us"
            >
              <Phone className="w-5 h-5 text-gray-500 group-hover:text-emerald-600 transition-colors" />
            </a>
            <Button
              onClick={handleWhatsAppClick}
              className="flex-1 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl shadow-lg shadow-emerald-200 transition-all border border-transparent hover:border-emerald-600 relative overflow-hidden group"
            >
              <div className="flex items-center justify-center gap-3">
                <WhatsAppIcon className="w-6 h-6 fill-white" />
                <span className="text-lg font-bold">Book via WhatsApp</span>
              </div>
            </Button>
          </div>
          <p className="text-[10px] text-center text-gray-400 font-medium mt-3">Instant confirmation • No hidden fees</p>
        </div>
      </div>
    </div>
  );
}
