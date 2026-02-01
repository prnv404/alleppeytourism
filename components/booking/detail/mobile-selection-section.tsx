'use client';

import { useState } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { Plus, Minus, Check, Calendar as CalendarIcon, Clock, Anchor, Coffee, Sun, Moon, Info } from 'lucide-react';
import { Activity } from '@/lib/packages-data';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { StayType } from './shared';

const schedules = [
  {
    id: 'overnight',
    title: 'Overnight Cruise',
    icon: Moon,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    description: 'Exclusive private houseboat experience tailored for relaxation.',
    duration: '21 Hours',
    checkin: '12:00 PM',
    sailsAt: 'Upon Check-in',
    checkout: '09:00 AM',
    checkoutNote: '(next day)',
    meals: ['Welcome Drink', 'Kerala Lunch', 'Delicious Dinner', 'Breakfast'],
  },
  {
    id: 'day',
    title: 'Day Cruise',
    icon: Sun,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    description: 'Explore Punnamada Lake, Vembanad Lake, and narrow canals.',
    duration: '5.5 Hours',
    checkin: '11:00 AM',
    sailsAt: 'Upon Check-in',
    checkout: '05:00 PM',
    checkoutNote: '(same day)',
    meals: ['Welcome Drink', 'Kerala Lunch', 'Tea/Coffee & Snacks'],
  },
  {
    id: 'night',
    title: 'Night Stay',
    icon: Anchor,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    description: 'Anchored experience in the serene backwaters under the stars.',
    duration: '15.5 Hours',
    checkin: '05:30 PM',
    sailsAt: 'Upon Check-in',
    checkout: '09:00 AM',
    checkoutNote: '(next day)',
    meals: ['Delicious Dinner', 'Refreshing Breakfast'],
  },
];

interface MobileSelectionSectionProps {
  activity: Activity;
  selectedVariantId: string;
  setSelectedVariantId: (id: string) => void;
  selectedDurationId: string | null;
  setSelectedDurationId: (id: string) => void;
  peopleCount: number;
  setPeopleCount: (count: number) => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  availableAddons: Activity[];
  selectedAddons: string[];
  toggleAddon: (id: string) => void;
  getAddonPrice: (addon: Activity) => number;
  stayType: StayType | null;
  setStayType: (type: StayType) => void;
}

export function MobileSelectionSection({
  activity,
  selectedVariantId,
  setSelectedVariantId,
  selectedDurationId,
  setSelectedDurationId,
  peopleCount,
  setPeopleCount,
  date,
  setDate,
  availableAddons,
  selectedAddons,
  toggleAddon,
  getAddonPrice,
  stayType,
  setStayType,
}: MobileSelectionSectionProps) {
  const [isMobileCalendarOpen, setIsMobileCalendarOpen] = useState(false);
  const [detailedViewType, setDetailedViewType] = useState<StayType | null>(null);

  // Calculate base price for display (Houseboat)
  const getBasePrice = () => {
    if (activity.type === 'houseboat' && activity.variants) {
      // Assume first variant or currently selected variant (though selector is hidden)
      const v = activity.variants.find(v => v.id === selectedVariantId) || activity.variants[0];
      return v ? v.price : 0;
    }
    return activity.basePrice;
  };
  const basePrice = getBasePrice();

  return (
    <div className="md:hidden space-y-6 pt-4 border-t border-gray-100">
      {/* Category/Type Select */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center justify-between">
          <span>{activity.type === 'houseboat' ? 'Choose Cruise Type' : 'Choose Duration'}</span>
          {!((activity.type === 'houseboat' && stayType) || (activity.type !== 'houseboat' && selectedDurationId)) && (
            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Required
            </span>
          )}
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide">
          {activity.type === 'houseboat'
            ? (() => {
              const v = activity.variants?.find(v => v.id === selectedVariantId);
              return v?.cruiseTypes?.map(ct => {
                const info = ct;
                const type = ct.id as StayType;
                // Find matching schedule for details preview
                const schedule = schedules.find(
                  s => s.id === (type === 'overnight' ? 'overnight' : type === 'day' ? 'day' : 'night')
                );

                return (
                  <div
                    key={type}
                    onClick={() => setDetailedViewType(type)}
                    className={cn(
                      'min-w-[200px] snap-center relative p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between active:scale-95',
                      stayType === type ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-100 bg-white'
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{info.label}</h4>
                        <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">{info.description}</p>
                      </div>
                      {stayType === type ? (
                        <Check className="w-4 h-4 bg-emerald-100 text-emerald-600 rounded-full p-0.5 shrink-0" />
                      ) : (
                        <Info className="w-4 h-4 text-gray-300 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <div className="font-bold text-emerald-700 text-sm">₹{(basePrice * info.multiplier).toLocaleString()}</div>
                      <div className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 font-medium">Details &gt;</div>
                    </div>
                  </div>
                );
              });
            })()
            : activity.durations?.map(duration => (
              <div
                key={duration.id}
                onClick={() => setSelectedDurationId(duration.id)}
                className={cn(
                  'min-w-[120px] snap-center p-3 rounded-xl border-2 transition-all cursor-pointer text-center flex flex-col justify-center active:scale-95',
                  selectedDurationId === duration.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-100 bg-white'
                )}
              >
                <div className="font-bold text-gray-900 text-sm">{duration.name}</div>
                <div className="text-xs font-semibold text-emerald-600 mt-0.5">
                  ₹{(duration.minPrice || activity.basePrice * duration.multiplier).toLocaleString()}
                </div>
              </div>
            ))}
        </div>
      </div>

      <Dialog open={!!detailedViewType} onOpenChange={open => !open && setDetailedViewType(null)}>
        <DialogContent className="max-w-[90vw] w-full md:max-w-md p-0 overflow-hidden rounded-3xl h-auto max-h-[80vh] flex flex-col border-none shadow-2xl bg-white outline-none">
          {detailedViewType &&
            (() => {
              const type = detailedViewType;
              const v = activity.variants?.find(v => v.id === selectedVariantId);
              const info = v?.cruiseTypes?.find(ct => ct.id === type);
              if (!info) return null;
              const scheduleId = type === 'overnight' ? 'overnight' : type === 'day' ? 'day' : 'night';
              const item = schedules.find(s => s.id === scheduleId);

              if (!item) return null;

              return (
                <>
                  {/* Compact Header */}
                  <div className={cn('relative p-5 pb-8 overflow-hidden', item.bg.replace('50', '50'))}>
                    <div
                      className={cn('absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20', item.bg.replace('50', '200'))}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className={cn(
                          'inline-flex items-center justify-center p-2.5 rounded-xl bg-white/80 backdrop-blur shadow-sm shrink-0'
                        )}
                      >
                        <item.icon className={cn('w-5 h-5', item.color)} />
                      </div>
                      <div>
                        <DialogTitle className="text-xl font-black text-gray-900 leading-none mb-1">{item.title}</DialogTitle>
                        <p className="text-xs text-gray-600 font-medium leading-snug max-w-[200px]">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-white -mt-4 rounded-t-[1.5rem] relative z-20 px-5 pt-6 pb-4 scrollbar-hide">
                    {/* Horizontal Timeline */}
                    <div className="flex items-start justify-between mb-8 relative">
                      <div className="absolute top-2 left-2 right-2 h-0.5 bg-gray-100 -z-10" />

                      <div className="text-center bg-white px-1 relative z-10">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-in</p>
                        <p className="text-sm font-black text-gray-900">{item.checkin}</p>
                      </div>
                      <div className="text-center bg-white px-1 relative z-10">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                        <p className="text-sm font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded-full">{item.duration}</p>
                      </div>
                      <div className="text-center bg-white px-1 relative z-10">
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Check-out</p>
                        <p className="text-sm font-black text-gray-900">{item.checkout}</p>
                      </div>
                    </div>

                    {/* Inclusions */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Coffee className="w-3.5 h-3.5 text-gray-900" />
                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Inclusions</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.meals.map((meal, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-gray-700"
                          >
                            <div className={cn('w-1 h-1 rounded-full', item.bg.replace('50', '400'))} />
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100/50 flex gap-2 items-start">
                      <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-amber-800 text-[10px] leading-relaxed">
                        Cruising & AC hours vary by boat type. Premium boats offer AC whenever anchored.
                      </p>
                    </div>
                  </div>

                  {/* Compact Actions Footer */}
                  <div className="p-4 pt-0 border-t-0 bg-white flex flex-col gap-2 z-30">
                    <div className="h-4 bg-gradient-to-t from-white to-transparent -mt-4 mb-1 pointer-events-none" />
                    <Button
                      className="w-full h-12 rounded-xl bg-gray-900 text-white text-base font-bold hover:bg-black shadow-lg shadow-gray-200 active:scale-[0.98] transition-all flex items-center justify-between px-4"
                      onClick={() => {
                        setStayType(type);
                        setDetailedViewType(null);
                      }}
                    >
                      <span>Confirm</span>
                      <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-md">
                        ₹{(basePrice * info.multiplier).toLocaleString()}
                      </span>
                    </Button>
                    <button
                      className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-900"
                      onClick={() => setDetailedViewType(null)}
                    >
                      Close
                    </button>
                  </div>
                </>
              );
            })()}
        </DialogContent>
      </Dialog>

      {/* Guests & Date Row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900 mb-2">Guests</h3>
          <div className="flex items-center justify-between h-12 px-3 rounded-xl border border-gray-200 bg-gray-50">
            <button
              onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100 text-gray-600"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-bold text-gray-900">{peopleCount}</span>
            <button
              onClick={() => setPeopleCount(peopleCount + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-100 text-gray-600"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex-[1.5]">
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Date <span className="text-red-500">*</span>
          </h3>
          <Dialog open={isMobileCalendarOpen} onOpenChange={setIsMobileCalendarOpen}>
            <DialogTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start h-12 rounded-xl border-gray-200 text-left font-normal bg-gray-50 text-sm px-3',
                  !date && 'text-gray-500',
                  !date && 'border-red-200 bg-red-50' // simple error state hint
                )}
              >
                <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
                {date ? (
                  <span className="font-semibold text-gray-900 truncate">{format(date, 'MMM dd')}</span>
                ) : (
                  <span>Pick date *</span>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[350px] p-0 bg-white rounded-3xl" showCloseButton={false}>
              <div className="p-4">
                <h4 className="text-lg font-bold text-center mb-4">Select Travel Date</h4>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={d => {
                    setDate(d);
                    setIsMobileCalendarOpen(false);
                  }}
                  disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className="mx-auto w-full max-w-none flex justify-center"
                />
                <div className="mt-4 flex justify-center">
                  <Button variant="ghost" onClick={() => setIsMobileCalendarOpen(false)} className="text-sm">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Add-ons Section Mobile */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" />
          Adventures Add-ons
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {availableAddons.map(addon => (
            <div
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={cn(
                'flex items-center p-3 rounded-xl border transition-all cursor-pointer',
                selectedAddons.includes(addon.id)
                  ? 'border-emerald-500 bg-emerald-50/30'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              )}
            >
              <div className="h-10 w-10 relative rounded-lg overflow-hidden shrink-0 bg-gray-200">
                <Image src={addon.image} alt={addon.name} fill className="object-cover" />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-sm font-bold text-gray-900">{addon.name}</h4>
                <p className="text-[10px] text-gray-500">Add for ₹{getAddonPrice(addon).toLocaleString()}</p>
              </div>
              <div
                className={cn(
                  'w-5 h-5 rounded border flex items-center justify-center transition-colors',
                  selectedAddons.includes(addon.id) ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-300 bg-white'
                )}
              >
                {selectedAddons.includes(addon.id) && <Check className="w-3 h-3" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
