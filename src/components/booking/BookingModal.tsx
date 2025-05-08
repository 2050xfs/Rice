// components/booking/BookingModal.tsx
"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useBookingModal } from '@/context/BookingModalContext';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venueName: string;
  venueAddress: string;
  guestCount: string;
  services: string[];
  djPackage?: string;
  photoBoothType?: string;
  photoBoothAddons?: string[];
  requirements: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  eventType: '',
  venueName: '',
  venueAddress: '',
  guestCount: '',
  services: [],
  djPackage: '',
  photoBoothType: '',
  photoBoothAddons: [],
  requirements: '',
};

const serviceOptions = [
  { id: 'dj', label: 'DJ Services' },
  { id: 'photoBooth', label: 'Photo Booth' },
  { id: 'eventPlanning', label: 'Event Planning (Basic Coordination)' },
];

const djPackages = ['Essential Beats', 'Premium Sound & Light', 'Ultimate Experience'];
const photoBoothTypes = ['360 Booth', 'Luxx Booth', 'Social Booth', 'Open Air Booth'];
const photoBoothAddonsList = ['Custom Backdrop', 'Premium Props', 'Guest Book Album', 'Digital Sharing Station'];

export default function BookingModal() {
  const { isOpen, closeModal } = useBookingModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setFormData(initialFormData);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentValues = prev[name] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [name]: newValues };
    });
  };
  

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("Form Data Submitted:", formData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    closeModal();
    toast({
      title: "Booking Request Sent!",
      description: "We've received your request and will be in touch shortly.",
      variant: "default",
    });
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Contact Information
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="label-styles">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Jane Doe" className="input-styles" required />
            </div>
            <div>
              <Label htmlFor="email" className="label-styles">Email Address</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="e.g., jane.doe@example.com" className="input-styles" required />
            </div>
            <div>
              <Label htmlFor="phone" className="label-styles">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="e.g., (555) 123-4567" className="input-styles" />
            </div>
          </div>
        );
      case 2: // Event Details
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="eventDate" className="label-styles">Event Date</Label>
              <Input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} className="input-styles" required />
            </div>
            <div>
              <Label htmlFor="eventType" className="label-styles">Event Type</Label>
              <Select name="eventType" value={formData.eventType} onValueChange={handleSelectChange('eventType')}>
                <SelectTrigger className="select-styles"><SelectValue placeholder="Select event type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Corporate">Corporate Event</SelectItem>
                  <SelectItem value="PrivateParty">Private Party</SelectItem>
                  <SelectItem value="SchoolEvent">School Event</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="venueName" className="label-styles">Venue Name (if known)</Label>
              <Input id="venueName" name="venueName" value={formData.venueName} onChange={handleChange} placeholder="e.g., The Grand Ballroom" className="input-styles" />
            </div>
            <div>
              <Label htmlFor="venueAddress" className="label-styles">Venue Address (if known)</Label>
              <Input id="venueAddress" name="venueAddress" value={formData.venueAddress} onChange={handleChange} placeholder="e.g., 123 Main St, Anytown" className="input-styles" />
            </div>
             <div>
              <Label htmlFor="guestCount" className="label-styles">Estimated Guest Count</Label>
              <Input id="guestCount" name="guestCount" type="number" value={formData.guestCount} onChange={handleChange} placeholder="e.g., 150" className="input-styles" />
            </div>
          </div>
        );
      case 3: // Service Selection
        return (
          <div className="space-y-6">
            <div>
              <Label className="label-styles">Services Interested In</Label>
              <div className="space-y-2 mt-2">
                {serviceOptions.map(service => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service.id}`}
                      checked={formData.services.includes(service.id)}
                      onCheckedChange={() => handleCheckboxChange('services', service.id)}
                    />
                    <Label htmlFor={`service-${service.id}`} className="font-normal label-styles">{service.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {formData.services.includes('dj') && (
              <div>
                <Label htmlFor="djPackage" className="label-styles">Preferred DJ Package</Label>
                <Select name="djPackage" value={formData.djPackage} onValueChange={handleSelectChange('djPackage')}>
                  <SelectTrigger className="select-styles"><SelectValue placeholder="Select DJ package (optional)" /></SelectTrigger>
                  <SelectContent>
                    {djPackages.map(pkg => <SelectItem key={pkg} value={pkg}>{pkg}</SelectItem>)}
                    <SelectItem value="Unsure">Not Sure / Discuss Options</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.services.includes('photoBooth') && (
              <>
                <div>
                  <Label htmlFor="photoBoothType" className="label-styles">Preferred Photo Booth Type</Label>
                  <Select name="photoBoothType" value={formData.photoBoothType} onValueChange={handleSelectChange('photoBoothType')}>
                    <SelectTrigger className="select-styles"><SelectValue placeholder="Select booth type (optional)" /></SelectTrigger>
                    <SelectContent>
                       {photoBoothTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                       <SelectItem value="Unsure">Not Sure / Discuss Options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="label-styles">Photo Booth Add-ons</Label>
                  <div className="space-y-2 mt-2 grid grid-cols-2 gap-2">
                    {photoBoothAddonsList.map(addon => (
                      <div key={addon} className="flex items-center space-x-2">
                        <Checkbox
                          id={`addon-${addon.replace(/\s+/g, '-')}`}
                          checked={formData.photoBoothAddons?.includes(addon)}
                          onCheckedChange={() => handleCheckboxChange('photoBoothAddons', addon)}
                        />
                        <Label htmlFor={`addon-${addon.replace(/\s+/g, '-')}`} className="font-normal label-styles text-xs">{addon}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="requirements" className="label-styles">Additional Details / Special Requirements</Label>
              <Textarea id="requirements" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Tell us more about your event, specific requests, or any questions you have." className="input-styles min-h-[100px]" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeModal(); }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="h2-style text-center">Request a Booking</DialogTitle>
          <DialogDescription className="text-center body-text-default">
            Step {currentStep} of 3: Complete the form below and we'll get back to you soon!
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto px-1 py-2 flex-grow">
          {renderStepContent()}
        </form>
        
        <DialogFooter className="mt-auto pt-4 border-t">
          {currentStep > 1 && (
            <Button type="button" variant="outline" onClick={prevStep} className="button-secondary-styles" hasShimmer>
              Previous
            </Button>
          )}
          {currentStep < 3 && (
            <Button type="button" onClick={nextStep} className="button-primary-styles ml-auto">
              Next
            </Button>
          )}
          {currentStep === 3 && (
            <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="button-primary-styles ml-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Request <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
