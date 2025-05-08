import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BookingWidgetProvider } from '@/context/BookingWidgetContext'; // Renamed import
import BookingFormWidget from '@/components/common/BookingFormWidget'; // Import the new widget
import BookingButton from '@/components/common/BookingButton'; // Import the floating button


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
        <BookingWidgetProvider> {/* Renamed Provider */}
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
          <BookingFormWidget /> {/* Render the new widget */}
          <BookingButton /> {/* Render the floating button */}
        </BookingWidgetProvider>
      </body>
    </html>
  );
}
