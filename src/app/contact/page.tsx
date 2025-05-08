// app/contact/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CalendarDays, Mail, Phone, User, MessageCircle, Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { contactPageContent } from '@/content/contact-page-content';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  eventDate?: string;
}

const initialContactFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  message: '',
  eventDate: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>(initialContactFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Contact Form Data Submitted:", formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setFormData(initialContactFormData); 
    toast({
      title: contactPageContent.form.successToastTitle,
      description: contactPageContent.form.successToastDescription,
      variant: "default",
    });
  };

  const { contactDetails, eventGallery, faq } = contactPageContent;
  const PhoneIcon = contactDetails.phone.icon;
  const MailIcon = contactDetails.email.icon;
  const GalleryIcon = eventGallery.icon;


  return (
    <div className="bg-gray-50 dark:bg-gray-950 pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="h1-style text-gray-900 dark:text-white">{contactPageContent.pageTitle}</h1>
          <p className="mt-4 body-text-large text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {contactPageContent.pageDescription}
          </p>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="relative bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-5 lg:gap-x-8">
          {/* Contact Information & Event Gallery */}
          <div className="bg-gray-50 dark:bg-gray-800 py-16 px-6 lg:col-span-2 lg:px-8 lg:py-16 xl:pr-12 rounded-lg shadow-md">
            <div className="max-w-lg mx-auto">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">{contactDetails.title}</h2>
              <p className="mt-3 body-text-default text-gray-500 dark:text-gray-400">
                {contactDetails.description}
              </p>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="sr-only">Phone number</dt>
                  <dd className="flex items-center text-base text-gray-500 dark:text-gray-300">
                    <PhoneIcon className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mr-3" aria-hidden="true" />
                    <a href={contactDetails.phone.href} className="hover:text-primary dark:hover:text-indigo-400">{contactDetails.phone.number}</a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd className="flex items-center text-base text-gray-500 dark:text-gray-300">
                    <MailIcon className="flex-shrink-0 w-6 h-6 text-gray-400 dark:text-gray-500 mr-3" aria-hidden="true" />
                    <a href={contactDetails.email.href} className="hover:text-primary dark:hover:text-indigo-400">{contactDetails.email.address}</a>
                  </dd>
                </div>
              </dl>

              {/* Event Gallery Carousel */}
              <div className="mt-12">
                <h3 className="flex items-center text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    <GalleryIcon className="w-6 h-6 mr-3 text-primary" /> {eventGallery.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {eventGallery.images.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md group">
                      <Image 
                        src={image.src} 
                        alt={image.alt} 
                        data-ai-hint={image.hint}
                        layout="fill" 
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                       <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                        <p className="text-white text-xs font-medium">{image.alt}</p>
                      </div>
                    </div>
                  ))}
                </div>
                 <p className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                  {eventGallery.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="py-16 px-6 lg:col-span-3 lg:py-16 lg:px-8 xl:pl-12 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6">
                <div>
                  <Label htmlFor="name" className="label-styles flex items-center"><User className="w-4 h-4 mr-2 opacity-70" /> Full Name</Label>
                  <Input type="text" name="name" id="name" autoComplete="name" value={formData.name} onChange={handleChange} className="input-styles mt-1" required placeholder={contactPageContent.form.placeholders.name} />
                </div>
                <div>
                  <Label htmlFor="email" className="label-styles flex items-center"><Mail className="w-4 h-4 mr-2 opacity-70" /> Email</Label>
                  <Input type="email" name="email" id="email" autoComplete="email" value={formData.email} onChange={handleChange} className="input-styles mt-1" required placeholder={contactPageContent.form.placeholders.email} />
                </div>
                <div>
                  <Label htmlFor="phone" className="label-styles flex items-center"><Phone className="w-4 h-4 mr-2 opacity-70" /> Phone (Optional)</Label>
                  <Input type="tel" name="phone" id="phone" autoComplete="tel" value={formData.phone} onChange={handleChange} className="input-styles mt-1" placeholder={contactPageContent.form.placeholders.phone} />
                </div>
                 <div>
                  <Label htmlFor="eventDate" className="label-styles flex items-center"><CalendarDays className="w-4 h-4 mr-2 opacity-70" /> Potential Event Date (Optional)</Label>
                  <Input type="date" name="eventDate" id="eventDate" value={formData.eventDate ?? ''} onChange={handleChange} className="input-styles mt-1" />
                </div>
                <div>
                  <Label htmlFor="message" className="label-styles flex items-center"><MessageCircle className="w-4 h-4 mr-2 opacity-70" /> Message</Label>
                  <Textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="input-styles mt-1 min-h-[120px]" required placeholder={contactPageContent.form.placeholders.message} />
                </div>
                <div>
                  <Button type="submit" disabled={isSubmitting} className="w-full button-primary-styles py-3 text-base">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> {contactPageContent.form.submittingText}
                      </>
                    ) : (
                      <>
                        {contactPageContent.form.submitButtonText} <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24 mt-16 sm:mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="h2-style text-gray-900 dark:text-white">
              {faq.title}
            </h2>
            <p className="mt-4 body-text-large text-gray-600 dark:text-gray-300">
              {faq.description}
            </p>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faq.items.map((item) => (
                <AccordionItem value={item.id} key={item.id} className="bg-gray-50 dark:bg-gray-800 p-0 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="text-left px-6 py-4 text-lg font-medium text-gray-700 dark:text-gray-200 hover:no-underline hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-t-lg transition-colors">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0 text-base text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
