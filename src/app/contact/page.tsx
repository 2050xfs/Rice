// app/contact/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building, CalendarDays, Mail, MapPin, Phone, User, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { contactPageHeroBg, contactPageMapPlaceholder } from '@/lib/image-urls';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  eventDate?: string;
}

const initialContactFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
  eventDate: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [mapLoaded, setMapLoaded] = useState(false); // To avoid hydration errors with map

  useEffect(() => {
    // This ensures map-related components only render client-side
    setMapLoaded(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Contact Form Data Submitted:", formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData(initialContactFormData); // Reset form
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out! We'll get back to you as soon as possible.",
      variant: "default",
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0">
          <Image
            src={contactPageHeroBg}
            alt="Abstract contact background"
            data-ai-hint="contact abstract pattern"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-6 sm:py-32 lg:px-8 text-center">
          <h1 className="h1-style text-white">Get in Touch</h1>
          <p className="mt-6 max-w-3xl mx-auto body-text-large text-indigo-100">
            We're excited to hear about your event! Whether you have questions, need a quote, or just want to brainstorm ideas, our team is ready to help.
          </p>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="relative bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-5">
          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-800 py-16 px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">Contact Information</h2>
              <p className="mt-3 body-text-default text-gray-500 dark:text-gray-400">
                Reach out to us through any of the channels below, or fill out the form and we'll contact you.
              </p>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="sr-only">Phone number</dt>
                  <dd className="flex items-center text-base text-gray-500 dark:text-gray-300">
                    <Phone className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mr-3" aria-hidden="true" />
                    <a href="tel:+1234567890" className="hover:text-primary dark:hover:text-indigo-400">(123) 456-7890</a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd className="flex items-center text-base text-gray-500 dark:text-gray-300">
                    <Mail className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mr-3" aria-hidden="true" />
                    <a href="mailto:info@riceentertainment.com" className="hover:text-primary dark:hover:text-indigo-400">info@riceentertainment.com</a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Address</dt>
                  <dd className="flex items-start text-base text-gray-500 dark:text-gray-300">
                    <MapPin className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mr-3 mt-1" aria-hidden="true" />
                    <span>123 Entertainment Ave<br />Suite 404<br />Party City, CA 90210</span>
                  </dd>
                </div>
              </dl>

              {/* Placeholder for a map */}
              {mapLoaded && (
                <div className="mt-10">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-md">
                    {/* Replace with actual map embed or next/image if static */}
                    <Image 
                      src={contactPageMapPlaceholder} 
                      alt="Map placeholder showing office location" 
                      data-ai-hint="city map location"
                      layout="fill" 
                      objectFit="cover"
                    />
                    {/* Example: <iframe src="google_maps_embed_url" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy"></iframe> */}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="py-16 px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                <div>
                  <Label htmlFor="name" className="label-styles flex items-center"><User className="w-4 h-4 mr-2 opacity-70" /> Full Name</Label>
                  <Input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange} className="input-styles mt-1" required />
                </div>
                <div>
                  <Label htmlFor="email" className="label-styles flex items-center"><Mail className="w-4 h-4 mr-2 opacity-70" /> Email</Label>
                  <Input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} className="input-styles mt-1" required />
                </div>
                <div>
                  <Label htmlFor="phone" className="label-styles flex items-center"><Phone className="w-4 h-4 mr-2 opacity-70" /> Phone (Optional)</Label>
                  <Input type="tel" name="phone" id="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className="input-styles mt-1" />
                </div>
                 <div>
                  <Label htmlFor="company" className="label-styles flex items-center"><Building className="w-4 h-4 mr-2 opacity-70" /> Company (If applicable)</Label>
                  <Input type="text" name="company" id="company" autoComplete="organization" value={formData.company} onChange={handleChange} className="input-styles mt-1" />
                </div>
                <div>
                  <Label htmlFor="subject" className="label-styles flex items-center"><MessageCircle className="w-4 h-4 mr-2 opacity-70" /> Subject</Label>
                   <Select name="subject" value={formData.subject} onValueChange={handleSubjectChange}>
                    <SelectTrigger className="select-styles mt-1"><SelectValue placeholder="Select a subject" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Booking Inquiry">Booking Inquiry</SelectItem>
                      <SelectItem value="DJ Services Question">DJ Services Question</SelectItem>
                      <SelectItem value="Photo Booth Question">Photo Booth Question</SelectItem>
                      <SelectItem value="VIBO App Support">VIBO App Support</SelectItem>
                      <SelectItem value="Partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="General Feedback">General Feedback/Question</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div>
                  <Label htmlFor="eventDate" className="label-styles flex items-center"><CalendarDays className="w-4 h-4 mr-2 opacity-70" /> Potential Event Date (Optional)</Label>
                  <Input type="date" name="eventDate" id="eventDate" value={formData.eventDate} onChange={handleChange} className="input-styles mt-1" />
                </div>
                <div>
                  <Label htmlFor="message" className="label-styles flex items-center"><MessageCircle className="w-4 h-4 mr-2 opacity-70" /> Message</Label>
                  <Textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="input-styles mt-1 min-h-[120px]" required />
                </div>
                <div>
                  <Button type="submit" disabled={isSubmitting} className="w-full button-primary-styles py-3 text-base">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
