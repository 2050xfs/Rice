// context/BookingWidgetContext.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

interface BookingWidgetContextType {
  isOpen: boolean;
  openWidget: () => void;
  closeWidget: () => void;
}

const BookingWidgetContext = createContext<BookingWidgetContextType | undefined>(undefined);

export function BookingWidgetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openWidget = useCallback(() => setIsOpen(true), []);
  const closeWidget = useCallback(() => setIsOpen(false), []);

  return (
    <BookingWidgetContext.Provider value={{ isOpen, openWidget, closeWidget }}>
      {children}
    </BookingWidgetContext.Provider>
  );
}

export function useBookingWidget() {
  const context = useContext(BookingWidgetContext);
  if (context === undefined) {
    throw new Error('useBookingWidget must be used within a BookingWidgetProvider');
  }
  return context;
}
