'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, MapPin, ChevronDown, ChevronUp, X, ArrowRight, Clock, FileText, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { activities, destinations } from '@/lib/packages-data';
import Link from 'next/link';

interface Selection {
  id: string;
  variantId?: string; // For houseboats
  durationId?: string; // For rides
  count?: number; // For person count in rides
}

export function PackageBuilder() {
  // Stores selected ACTIVITY IDs
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Stores details for each selection
  const [selections, setSelections] = useState<Record<string, Selection>>({});

  // Destinations are simple strings
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);

  // To toggle dropdown visibility without selecting/deselecting
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleActivity = (id: string) => {
    if (selectedIds.includes(id)) {
      // Remove
      setSelectedIds(prev => prev.filter(i => i !== id));
      const newSelections = { ...selections };
      delete newSelections[id];
      setSelections(newSelections);
      if (expandedId === id) setExpandedId(null);
    } else {
      // Add - and set defaults
      setSelectedIds(prev => [...prev, id]);

      const activity = activities.find(a => a.id === id);
      let defaultSelection: Selection = { id, count: 1 };

      if (activity?.type === 'houseboat' && activity.variants) {
        defaultSelection.variantId = activity.variants[0].id;
      } else if (activity?.type === 'time-based' && activity.durations) {
        defaultSelection.durationId = activity.durations[0].id;
      }

      setSelections(prev => ({ ...prev, [id]: defaultSelection }));
      setExpandedId(id); // Auto expand to show options
    }
  };

  const updateSelection = (id: string, key: 'variantId' | 'durationId', value: string) => {
    setSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], [key]: value },
    }));
  };

  const updateCount = (id: string, delta: number) => {
    setSelections(prev => {
      const current = prev[id]?.count || 1;
      const newCount = Math.max(1, current + delta);
      return {
        ...prev,
        [id]: { ...prev[id], count: newCount },
      };
    });
  };

  const toggleDestination = (id: string) => {
    setSelectedDestinations(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  // Calculate Price
  const calculateTotal = () => {
    let total = 0;
    selectedIds.forEach(id => {
      const activity = activities.find(a => a.id === id);
      const selection = selections[id];
      if (!activity || !selection) return;

      if (activity.type === 'houseboat' && selection.variantId) {
        const variant = activity.variants?.find(v => v.id === selection.variantId);
        if (variant) total += variant.price;
      } else if (activity.type === 'time-based' && selection.durationId) {
        const duration = activity.durations?.find(d => d.id === selection.durationId);
        if (duration) total += activity.basePrice * duration.multiplier * (selection.count || 1);
      }
    });
    return total;
  };

  return (
    <section className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Compact Header */}
        <div className="text-center mb-7">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Plan your custom <span className="text-emerald-600">Alleppey Trip</span>
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Select Houseboat cruise, Shikara tours, Speed Boat rides or kayaking to calculate your total package cost.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Configuration List */}
          <div className="flex-1 w-full space-y-6">
            {/* Experiences List */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Experiences</h3>
              {activities.map(item => {
                const isSelected = selectedIds.includes(item.id);
                const isExpanded = expandedId === item.id || isSelected;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isSelected ? 'border-emerald-500 bg-emerald-50/10' : 'border-gray-200 bg-white'}`}
                  >
                    {/* Main Row */}
                    <div
                      className="flex items-center p-3 gap-3 cursor-pointer hover:bg-gray-50/50"
                      onClick={() => toggleActivity(item.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>

                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image src={item.images[0].src} alt={item.images[0].alt} width={40} height={40} className="object-cover w-full h-full" />
                      </div>

                      <div className="flex-grow">
                        <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500">
                          {(() => {
                            if (isSelected) {
                              if (item.type === 'houseboat' && selections[item.id]?.variantId) {
                                const variant = item.variants?.find(v => v.id === selections[item.id].variantId);
                                if (variant) return `₹${variant.price.toLocaleString()}`;
                              } else if (item.type === 'time-based' && selections[item.id]?.durationId) {
                                const duration = item.durations?.find(d => d.id === selections[item.id].durationId);
                                if (duration) {
                                  const price = item.basePrice * duration.multiplier * (selections[item.id].count || 1);
                                  return `₹${price.toLocaleString()}`;
                                }
                              }
                            }
                            return `From ₹${item.basePrice.toLocaleString()}`;
                          })()}
                        </p>
                      </div>

                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setExpandedId(expandedId === item.id ? null : item.id);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Expandable Options Panel */}
                    <AnimatePresence>
                      {isExpanded && isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-100/50"
                        >
                          <div className="p-3 pl-16 bg-gray-50/50">
                            {item.type === 'houseboat' && (
                              <div className="space-y-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase">Select Category</p>
                                <div className="flex flex-wrap gap-2">
                                  {item.variants?.map(v => (
                                    <button
                                      key={v.id}
                                      onClick={() => updateSelection(item.id, 'variantId', v.id)}
                                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${selections[item.id]?.variantId === v.id ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                                    >
                                      {v.name}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {item.type === 'time-based' && (
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1 mb-2">
                                    <Clock className="w-3 h-3" /> Select Duration
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {item.durations?.map(d => (
                                      <button
                                        key={d.id}
                                        onClick={() => updateSelection(item.id, 'durationId', d.id)}
                                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${selections[item.id]?.durationId === d.id ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                                      >
                                        {d.name}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* Person Counter for Kayak/Speedboat */}
                                {(item.id === 'kayak' || item.id === 'speedboat') && (
                                  <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1 mb-2">
                                      Number of People
                                    </p>
                                    <div className="flex items-center gap-3">
                                      <button
                                        onClick={() => updateCount(item.id, -1)}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                                        disabled={(selections[item.id]?.count || 1) <= 1}
                                      >
                                        -
                                      </button>
                                      <span className="text-sm font-bold w-4 text-center">{selections[item.id]?.count || 1}</span>
                                      <button
                                        onClick={() => updateCount(item.id, 1)}
                                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                            <Link
                              href={`/book/${item.id}`}
                              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 bg-emerald-50 px-3 py-2 rounded-lg transition-colors"
                            >
                              View Full Details <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>


          </div>

          {/* Right: Sticky Summary Card */}
          <div className="w-full lg:w-80 lg:shrink-0">
            <div className="sticky top-24">
              <Card className="bg-white shadow-lg border border-gray-100 rounded-2xl overflow-hidden">
                <div className="p-3 border-b border-gray-100 bg-gray-50/30">
                  <h3 className="font-bold text-gray-900 text-sm">Your Plan</h3>
                </div>
                <div className="p-3 flex flex-col gap-3">
                  {selectedIds.length === 0 && selectedDestinations.length === 0 ? (
                    <p className="text-gray-400 text-sm italic my-auto text-center">No items selected.</p>
                  ) : (
                    <div className="space-y-3 mb-4">
                      {selectedIds.map(id => {
                        const item = activities.find(a => a.id === id);
                        const sel = selections[id];
                        // Find Name of variant/duration
                        let detail = '';
                        let price = 0;
                        if (item?.type === 'houseboat') {
                          const v = item.variants?.find(x => x.id === sel.variantId);
                          detail = v?.name || '';
                          price = v?.price || 0;
                        } else {
                          const d = item?.durations?.find(x => x.id === sel.durationId);
                          detail = `${d?.name || ''} x ${sel.count || 1} person(s)`;
                          price = (item?.basePrice || 0) * (d?.multiplier || 1) * (sel.count || 1);
                        }

                        return (
                          <div key={id} className="text-sm">
                            <div className="flex justify-between font-medium text-gray-900">
                              <span>{item?.name}</span>
                              <span>₹{price.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-gray-500">{detail}</div>
                          </div>
                        );
                      })}

                      {selectedDestinations.length > 0 && (
                        <div className="border-t border-dashed border-gray-200 pt-2 mt-2">
                          <p className="text-xs text-gray-500 font-medium mb-1">Visits:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedDestinations.map(did => (
                              <span key={did} className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                                {destinations.find(d => d.id === did)?.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 mt-2">
                    {/* Date Picker */}
                    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start text-left font-normal border-gray-200 bg-gray-50 h-9 hover:bg-white text-xs',
                            !date && 'text-gray-500',
                            !date && 'border-red-200 bg-red-50/50' // hint
                          )}
                        >
                          <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                          {date ? format(date, 'MMM dd, yyyy') : <span>Pick date *</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={d => {
                            setDate(d);
                            setIsCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <input
                      type="text"
                      placeholder="Name (Optional)"
                      className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-black transition-colors bg-gray-50 focus:bg-white h-9"
                      id="guest-name-input"
                    />
                    <Button
                      onClick={() => {
                        if (!date) {
                          alert('Please select a travel date to get your itinerary.');
                          return;
                        }
                        const nameInput = document.getElementById('guest-name-input') as HTMLInputElement;
                        const name = nameInput?.value || 'Guest';

                        let message = `Hi Alleppey Tourism! 🌴\nI'm *${name}*, and I've created a custom package on your website.`;

                        // Date is now guaranteed
                        message += `\n*Travel Date:* ${format(date, 'PPP')}`;

                        message += `\n\n*Selected Experiences:*`;

                        if (selectedIds.length === 0) message += '\n- None selected';

                        selectedIds.forEach(id => {
                          const item = activities.find(a => a.id === id);
                          const sel = selections[id];
                          let detail = '';
                          if (item?.type === 'houseboat') {
                            const v = item.variants?.find(x => x.id === sel.variantId);
                            detail = v?.name || '';
                          } else {
                            const d = item?.durations?.find(x => x.id === sel.durationId);
                            detail = d?.name || '';
                          }
                          message += `\n- ${item?.name} (${detail})`;
                        });

                        if (selectedDestinations.length > 0) {
                          message += '\n\n*Alleppey Tourist Places:*\n';
                          selectedDestinations.forEach(did => {
                            const d = destinations.find(x => x.id === did);
                            message += `- ${d?.name}\n`;
                          });
                        }

                        message += '\nCould you please check availability and share the best offer for this plan?';

                        window.open(`https://wa.me/919947753154?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                      className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all duration-300 h-10 text-sm font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Get availability
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
