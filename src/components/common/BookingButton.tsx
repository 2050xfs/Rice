// src/components/common/BookingButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/context/BookingModalContext"; // Updated import path and hook name
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BookingButton() {
  const { openModal } = useBookingModal(); // Updated hook usage

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40" // Ensure it's below the widget (z-50) but above other content
    >
        <Button
            size="lg"
            onClick={openModal} // Use openModal
            className="rounded-full shadow-xl primary-gradient text-white px-5 py-5 h-16 w-16 md:h-auto md:w-auto md:px-6 md:py-3 flex items-center justify-center gap-2 hover:scale-110 transition-transform duration-300"
            aria-label="Open Booking Widget"
        >
            <Calendar className="h-6 w-6 md:h-5 md:w-5" />
            <span className="hidden md:inline">Book Now</span>
        </Button>
    </motion.div>
  );
}
