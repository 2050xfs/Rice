// src/components/common/BookingButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/context/BookingModalContext";
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function BookingButton() {
  const { openModal } = useBookingModal();

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40" // Ensure it's below the widget (z-50) but above other content
    >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                  size="icon" // Use icon size for consistency
                  onClick={openModal}
                  className="rounded-full shadow-xl primary-gradient text-white h-14 w-14 flex items-center justify-center hover:scale-110 transition-transform duration-300" // Fixed size, removed gap
                  aria-label="Book Now" // Keep aria-label for accessibility
              >
                  <Calendar className="h-6 w-6" /> {/* Ensure icon size is appropriate */}
                  {/* Removed the "Book Now" text span */}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Book Now</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
    </motion.div>
  );
}
