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
import YouTubeEmbed from '@/components/common/YouTubeEmbed'; // Import the YouTube embed component
import { extractYouTubeId } from '@/lib/utils'; // Import the YouTube ID extraction function

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
    const { hero, offerings, packages, techSpecs, benefits, gallery, cta, videoDemo } = lightingPageContent;
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
            <div className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center mb-12 md:mb-16">
                        <p className="section-label-style text-white !text-white font-bold tracking-wider drop-shadow-sm">{offerings.label}</p>
                        <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                            {offerings.title}
                        </h2>
                    </div>
                    
                    {/* Mobile Tab Navigation (visible on small screens only) */}
                    <div className="md:hidden mb-8 overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-2 pb-2">
                            {offerings.items.map((item, index) => (
                                <button
                                    key={`tab-${item.title}`}
                                    onClick={() => {
                                        const element = document.getElementById(`service-${index}`);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                                        }
                                    }}
                                    className="flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 text-sm font-medium"
                                >
                                    <item.icon className="h-4 w-4 text-primary" />
                                    <span>{item.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {/* Main Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {offerings.items.map((item, index) => (
                            <div 
                                id={`service-${index}`}
                                key={item.title} 
                                className="group relative flex flex-col bg-white dark:bg-gray-800/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-800"
                            >
                                {/* Image with Overlay */}
                                <div className="relative aspect-[16/9] w-full overflow-hidden">
                                    <Image 
                                        src={item.image} 
                                        alt={item.title} 
                                        data-ai-hint={item.imageHint} 
                                        layout="fill" 
                                        objectFit="cover" 
                                        className="transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-full bg-primary/90 backdrop-blur-sm">
                                                <item.icon className="h-5 w-5 text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Content */}
                                <div className="p-5 flex-grow flex flex-col">
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                                    
                                    {/* Features */}
                                    <div className="mt-auto">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Features:</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                            {item.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start">
                                                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                                                    <span className="text-xs text-gray-600 dark:text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             {/* Packages Section */}
             <div className="bg-gradient-to-r from-indigo-800 to-indigo-600 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center mb-16">
                        <p className="section-label-style text-white !text-white font-bold tracking-wider drop-shadow-sm">{packages.label}</p>
                        <h2 className="mt-2 h2-style text-white font-bold drop-shadow-md">
                            {packages.title}
                        </h2>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {packages.items.map((pkg) => (
                             <Card key={pkg.name} className="bg-white/15 dark:bg-white/10 backdrop-blur-sm border border-white/30 shadow-xl flex flex-col">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-xl font-bold text-white drop-shadow-sm">{pkg.name}</CardTitle>
                                    <CardDescription className="text-white/90 text-sm font-medium">{pkg.perfectFor}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col">
                                    <ul className="space-y-3 text-sm text-white flex-grow mb-6">
                                        {pkg.includes.map((item, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="h-4 w-4 text-green-300 drop-shadow-sm mr-2 mt-0.5 shrink-0" />
                                                <span className="drop-shadow-sm">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                     <Button onClick={openBookingModal} variant="transparent" className="w-full mt-auto bg-white/20 hover:bg-white/30 text-white font-medium border-white/30 shadow-md" hasShimmer>
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
                        <p className="section-label-style text-white !text-white font-bold tracking-wider drop-shadow-sm">{techSpecs.label}</p>
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

            {/* Video Demo Section */}
            <div className="py-24 sm:py-32 bg-white dark:bg-gray-950">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <a href="#video-demo" className="text-sm font-semibold text-blue-600 hover:text-blue-500">
                            {videoDemo.linkText}
                        </a>
                        <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                            {videoDemo.title}
                        </h2>
                        <p className="mt-4 mb-8 body-text-large text-gray-600 dark:text-gray-300">
                            {videoDemo.description}
                        </p>
                    </div>
                    
                    <div id="video-demo" className="max-w-3xl mx-auto">
                        <YouTubeEmbed 
                            videoId={extractYouTubeId(videoDemo.videoUrl)} 
                            title="Professional Wash Lighting Demo"
                        />
                        <p className="mt-6 text-center text-base text-gray-600 dark:text-gray-400">
                            {videoDemo.caption}
                        </p>
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
                        <p className="section-label-style text-white !text-white font-bold tracking-wider drop-shadow-sm">{benefits.label}</p>
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
            <div className="bg-gray-100 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32">
                <div className="relative isolate overflow-hidden bg-gray-900/50 dark:bg-black/30 px-6 py-16 shadow-2xl rounded-2xl sm:rounded-3xl sm:px-16 md:py-24">
                    <svg
                    viewBox="0 0 1024 1024"
                    className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                    aria-hidden="true"
                    >
                    <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                    <defs>
                        <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                        <stop stopColor="#6366F1" />
                        <stop offset={1} stopColor="#4F46E5" />
                        </radialGradient>
                    </defs>
                    </svg>
                    <div className="mx-auto max-w-2xl text-center">
                    <h2 className="h2-style text-white">
                        {cta.title}
                    </h2>
                    <p className="mt-6 body-text-large text-gray-300">
                        {cta.description}
                    </p>
                    <div className="mt-10">
                        <Button onClick={openBookingModal} size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                        {cta.buttonText}
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}
