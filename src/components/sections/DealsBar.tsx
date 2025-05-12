// components/sections/DealsBar.tsx
"use client";
import { Gift, CalendarDays, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingModal } from '@/context/BookingModalContext'; // Updated import

export default function DealsBar() {
  const { openModal } = useBookingModal(); // Updated hook usage

  const deals = [
    {
      title: "New Client Special",
      description: "10% Off Your First Booking",
      icon: Gift,
    },
    {
      title: "Free Consultation",
      description: "Entertainment Planning",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-4 sticky-deals-bar">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full justify-center sm:justify-start">
          {deals.map((deal, index) => (
            <div key={index} className="flex items-center gap-2 whitespace-nowrap">
              <deal.icon className="h-6 w-6 text-white opacity-80 shrink-0" />
              <div className="text-center sm:text-left">
                <p className="font-semibold text-white text-sm">{deal.title}</p>
                <p className="text-xs text-indigo-200">{deal.description}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={openModal} // Use openModal
          variant="secondary"
          className="bg-white/20 hover:bg-white/30 text-white shrink-0 px-6 py-2 shadow-md border border-white/30 text-sm w-full sm:w-auto mt-2 sm:mt-0"
          hasShimmer
        >
          Book Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
