// app/services/lighting/page.tsx
"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useBookingModal } from '@/context/BookingModalContext';
import { lightingPageContent } from '@/content/lighting-services-page-content';
import { CheckCircle } from 'lucide-react';
import PageHero from '@/components/sections/PageHero'; // Import the new hero

// Demo Request Form Component
const LightingDemoForm = ({ onOpenChange }: { onOpenChange: (open: boolean) => void }) => {
    const [formData, setFormData] = useState({ name: '', email: '', eventDate: '', eventType: '', venueType: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

     const handleSelectChange = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Lighting Demo Request:", formData);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        toast({
            title: lightingPageContent.demoForm.successMessage,
            variant: 'default',
        });
        setFormData({ name: '', email: '', eventDate: '', eventType: '', venueType: '' }); // Reset form
        onOpenChange(false); // Close dialog on success
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{lightingPageContent.demoForm.title}</DialogTitle>
                 <DialogDescription>
                    Tell us a bit about your event, and we'll get back to you to schedule a lighting demo.
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} required />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="eventType">Event Type</Label>
                     <Select name="eventType" onValueChange={(value) => handleSelectChange('eventType', value)} value={formData.eventType} required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                            {lightingPageContent.demoForm.eventTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="venueType">Venue Type</Label>
                     <Select name="venueType" onValueChange={(value) => handleSelectChange('venueType', value)} value={formData.venueType} required>
                         <SelectTrigger>
                            <SelectValue placeholder="Select venue type" />
                        </SelectTrigger>
                        <SelectContent>
                            {lightingPageContent.demoForm.venueTypes.map(type => (
                                <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button type="submit" disabled={isSubmitting} className="mt-4 button-primary-styles">
                    {isSubmitting ? 'Submitting...' : lightingPageContent.demoForm.submitButtonText}
                </Button>
            </form>
        </DialogContent>
    );
};


export default function LightingServicesPage() {
    const { hero, offerings, packages, techSpecs, benefits, gallery, cta } = lightingPageContent;
    const { openModal: openBookingModal } = useBookingModal();
    const galleryRef = useRef<HTMLDivElement>(null);
    const [isDemoFormOpen, setIsDemoFormOpen] = useState(false);

    const scrollToGallery = () => {
        galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-950">
             <Dialog open={isDemoFormOpen} onOpenChange={setIsDemoFormOpen}>
                <PageHero
                    badgeText={hero.badgeText}
                    titleParts={hero.titleParts}
                    subtitle={hero.subheading}
                    features={hero.features}
                    primaryCta={{ text: hero.primaryCtaText, action: () => setIsDemoFormOpen(true) }}
                    secondaryCta={hero.secondaryCtaText ? { text: hero.secondaryCtaText, action: scrollToGallery } : undefined}
                    imageSrc={hero.backgroundImage}
                    imageAlt={hero.backgroundImageAlt}
                    imageHint={hero.backgroundImageHint}
                />
                <LightingDemoForm onOpenChange={setIsDemoFormOpen} />
            </Dialog>


            {/* Lighting Services Offerings Section */}
            <div className="py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center mb-16">
                        <p className="section-label-style">{offerings.label}</p>
                        <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                            {offerings.title}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {offerings.items.map((item) => (
                            <Card key={item.title} className="card-feature-styles bg-white dark:bg-gray-800/50 shadow-lg hover:shadow-xl flex flex-col">
                                <div className="relative h-48 w-full mb-4 rounded-t-lg overflow-hidden">
                                  <Image src={item.image} alt={item.title} data-ai-hint={item.imageHint} layout="fill" objectFit="cover" />
                                </div>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <item.icon className="h-8 w-8 text-primary" />
                                        <CardTitle className="h3-style text-gray-900 dark:text-white">{item.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col">
                                    <CardDescription className="body-text-default text-gray-600 dark:text-gray-400 mb-4">{item.description}</CardDescription>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 flex-grow">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

             {/* Packages Section */}
             <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center mb-16">
                        <p className="section-label-style text-indigo-200">{packages.label}</p>
                        <h2 className="mt-2 h2-style text-white">
                            {packages.title}
                        </h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.items.map((pkg) => (
                             <Card key={pkg.name} className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 shadow-lg flex flex-col">
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold text-white">{pkg.name}</CardTitle>
                                    <CardDescription className="text-indigo-200 text-sm">{pkg.perfectFor}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col">
                                    <ul className="space-y-2 text-sm text-gray-200 flex-grow mb-6">
                                        {pkg.includes.map((item, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="h-4 w-4 text-green-300 mr-2 mt-0.5 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                     <Button onClick={openBookingModal} variant="transparent" className="w-full mt-auto button-transparent-styles" hasShimmer>
                                        {packages.ctaButtonText}
                                    </Button>
                                </CardContent>
                             </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Technical Specifications Section */}
            <div className="py-24 sm:py-32">
                 <div className="max-w-7xl mx-auto px-6 lg:px-8">
                     <div className="max-w-2xl mx-auto lg:text-center mb-16">
                        <p className="section-label-style">{techSpecs.label}</p>
                        <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                            {techSpecs.title}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {techSpecs.items.map((spec) => (
                            <Card key={spec.title} className="card-standard-styles bg-white dark:bg-gray-800/50">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                     <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20">
                                        <spec.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-lg font-semibold">{spec.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc pl-5">
                                        {spec.details.map((detail, idx) => <li key={idx}>{detail}</li>)}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

             {/* Gallery Section */}
            <div ref={galleryRef} id="lighting-gallery" className="bg-gray-100 dark:bg-gray-900 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center mb-16">
                        <h2 className="h2-style text-gray-900 dark:text-white">
                           {gallery.title}
                        </h2>
                         <p className="mt-4 body-text-large text-gray-600 dark:text-gray-300">
                           {gallery.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                         {gallery.images.map((item, index) => (
                            <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden group shadow-lg">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                data-ai-hint={item.hint}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <p className="text-white text-sm font-medium">{item.alt}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             {/* Client Benefits Section */}
            <div className="py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center mb-16">
                        <p className="section-label-style">{benefits.label}</p>
                        <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                            {benefits.title}
                        </h2>
                        <p className="mt-6 body-text-large text-gray-600 dark:text-gray-300">
                           {benefits.description}
                        </p>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                         {benefits.items.map((benefit) => (
                            <div key={benefit.title} className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                                <benefit.icon className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0 mt-1" />
                                <p className="text-base font-medium text-gray-800 dark:text-gray-100">{benefit.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Final CTA */}
            <div className="bg-gray-800 py-24 sm:py-32">
                <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
                    <h2 className="h2-style text-white">
                        {cta.title}
                    </h2>
                    <p className="mt-6 body-text-large text-gray-300">
                        {cta.description}
                    </p>
                    <div className="mt-10">
                        <Button onClick={openBookingModal} size="lg" className="button-primary-styles">
                            {cta.buttonText}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
