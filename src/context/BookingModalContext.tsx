// context/BookingModalContext.tsx
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

interface BookingModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <BookingModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (context === undefined) {
    throw new Error('useBookingModal must be used within a BookingModalProvider');
  }
  return context;
}
