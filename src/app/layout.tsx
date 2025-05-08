import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookingModalProvider } from '@/context/BookingModalContext';
import BookingModal from '@/components/booking/BookingModal';


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'Rice Entertainment - Premier Event Services',
  description: 'Offering top-tier DJ services, photo booths, and event planning for unforgettable experiences.',
  keywords: 'DJ, Photo Booth, Event Planning, Rice Entertainment, Wedding DJ, Corporate Events, Party DJ, 360 Photo Booth',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <BookingModalProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}
