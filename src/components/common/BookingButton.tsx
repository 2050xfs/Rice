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
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40" // Adjusted for small screens
    >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                  size="icon" // Use icon size for consistency
                  onClick={openModal}
                  className="rounded-full shadow-xl drop-shadow-lg primary-gradient text-white h-12 w-12 sm:h-14 sm:w-14 flex items-center justify-center hover:scale-110 transition-transform duration-300" // Adjusted size for small screens
                  aria-label="Book Now" // Keep aria-label for accessibility
              >
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6" /> {/* Adjusted icon size for small screens */}
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
