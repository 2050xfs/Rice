// src/components/common/BookingFormWidget.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler, Controller } from 'react-hook-form'; // Import Controller
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useBookingModal } from '@/context/BookingModalContext'; 
import { submitBookingRequest, getRedirectUrl } from '@/services/bookingService'; 
import { CalendarIcon, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react';


// Define Zod schema for form validation
const bookingSchema = z.object({
  eventDate: z.date({ required_error: "Event date is required." }),
  eventType: z.string().min(1, { message: "Event type is required." }),
  name: z.string().min(1, { message: "Your name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().optional(),
});

type BookingFormInput = z.infer<typeof bookingSchema>;

// Define view states as string literals
const VIEW_STATE = {
  FORM: 'form',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error'
} as const;

type ViewState = typeof VIEW_STATE[keyof typeof VIEW_STATE];

export default function BookingFormWidget() {
  const { isOpen, closeModal } = useBookingModal(); 
  const [viewState, setViewState] = useState<ViewState>(VIEW_STATE.FORM);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null); 
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<BookingFormInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      eventType: '',
      name: '',
      email: '',
      message: '',
    },
  });

   useEffect(() => {
    if (isOpen) {
      getRedirectUrl().then(url => setRedirectUrl(url));
      setViewState(VIEW_STATE.FORM);
      setSubmissionError(null);
      reset(); 
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<BookingFormInput> = async (data) => {
    setViewState(VIEW_STATE.SUBMITTING);
    setSubmissionError(null);

    const formattedData = {
      ...data,
      eventDate: format(data.eventDate, 'yyyy-MM-dd'), 
    };

    try {
      await submitBookingRequest(formattedData);
      setViewState(VIEW_STATE.SUCCESS);
      toast({
        title: "Inquiry Submitted!",
        description: "Redirecting you to complete your booking...",
        variant: "default",
      });
      setTimeout(() => {
        if (redirectUrl) {
            window.location.href = redirectUrl; 
        } else {
            console.warn("Redirect URL not available, cannot redirect.");
             closeModal(); 
        }
      }, 2000); 
    } catch (error: any) {
      console.error("Submission failed:", error);
      setSubmissionError(error.message || 'Failed to submit inquiry. Please try again.');
      setViewState(VIEW_STATE.ERROR);
      toast({
        title: "Submission Failed",
        description: error.message || 'Could not submit inquiry. Please try again later.',
        variant: "destructive",
      });
    }
  };

  const handleTryAgain = () => {
    setViewState(VIEW_STATE.FORM);
    setSubmissionError(null);
  };

  const handleCompleteBooking = () => {
     if (redirectUrl) {
         window.location.href = redirectUrl; 
     } else {
        console.warn("Redirect URL not available for immediate redirect.");
        closeModal();
     }
  };

  const panelVariants = {
    hidden: { opacity: 0, y: '100%' },
    visible: { opacity: 1, y: '0%' },
    exit: { opacity: 0, y: '100%' },
  };

  const desktopPanelVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: '0%' },
    exit: { opacity: 0, x: '100%' },
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-50 flex items-end md:items-stretch md:justify-end"
          aria-labelledby="booking-widget-title"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal} 
          />

          <motion.div
            variants={typeof window !== 'undefined' && window.innerWidth < 768 ? panelVariants : desktopPanelVariants}
            className="relative z-10 w-full md:w-[450px] h-full md:h-auto md:max-h-[90vh] md:my-4 md:mr-4 bg-white dark:bg-gray-900 shadow-2xl rounded-t-lg md:rounded-lg flex flex-col overflow-hidden max-w-[100vw]"
          >
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
              <h2 id="booking-widget-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                {viewState === VIEW_STATE.FORM && 'Request Booking'}
                {viewState === VIEW_STATE.SUBMITTING && 'Submitting...'}
                {viewState === VIEW_STATE.SUCCESS && 'Date Available!'}
                {viewState === VIEW_STATE.ERROR && 'Date Unavailable'}
              </h2>
              <Button variant="ghost" size="icon" onClick={closeModal} aria-label="Close booking widget">
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </Button>
            </div>

            <div className="flex-grow overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {viewState === VIEW_STATE.FORM && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    <div>
                       <Label htmlFor="eventDate" className={cn("label-styles", errors.eventDate && "text-destructive")}>Event Date</Label>
                        <Controller
                            name="eventDate"
                            control={control}
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                          variant={"outline"} // Using outline variant for border
                                          className={cn(
                                            "flex min-h-[44px] w-full items-center rounded-md border border-input bg-background px-3 py-2.5 text-base md:text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 justify-start text-left font-normal mt-1",
                                            !field.value && "text-muted-foreground",
                                            errors.eventDate && "border-destructive focus-visible:ring-destructive"
                                          )}
                                        >
                                          <CalendarIcon className="mr-2 h-4 w-4" />
                                          {field.value ? format(field.value, "PPP") : <span className="whitespace-nowrap">Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                            disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} 
                                        />
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                      {errors.eventDate && <p className="text-sm text-destructive mt-1">{errors.eventDate.message}</p>}
                    </div>

                     <div>
                        <Label htmlFor="eventType" className={cn("label-styles", errors.eventType && "text-destructive")}>Event Type</Label>
                         <Controller
                            name="eventType"
                            control={control}
                            render={({ field }) => (
                               <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className={cn("mt-1", errors.eventType && "border-destructive focus-visible:ring-destructive")}>
                                        <SelectValue placeholder="Select event type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Wedding">Wedding</SelectItem>
                                        <SelectItem value="Corporate Event">Corporate Event</SelectItem>
                                        <SelectItem value="Private Party">Private Party</SelectItem>
                                        <SelectItem value="School Event">School Event</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.eventType && <p className="text-sm text-destructive mt-1">{errors.eventType.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="name" className={cn("label-styles", errors.name && "text-destructive")}>Your Name</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter your full name"
                        className={cn("mt-1", errors.name && "border-destructive focus:ring-destructive")}
                        aria-invalid={errors.name ? "true" : "false"}
                      />
                      {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className={cn("label-styles", errors.email && "text-destructive")}>Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your@email.com"
                        className={cn("mt-1", errors.email && "border-destructive focus:ring-destructive")}
                        aria-invalid={errors.email ? "true" : "false"}
                      />
                      {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="message" className="label-styles">Additional Details (Optional)</Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Tell us more about your event (optional)"
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <div className="sticky bottom-0 bg-white dark:bg-gray-900 p-4 -mx-6 -mb-6 border-t dark:border-gray-700">
                        <Button type="submit" className="w-full button-primary-styles py-3" disabled={viewState === VIEW_STATE.SUBMITTING}>
                            {viewState === VIEW_STATE.SUBMITTING ? (
                                <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                                </>
                            ) : (
                                'Submit Inquiry'
                            )}
                        </Button>
                    </div>
                  </motion.form>
                )}

                {viewState === VIEW_STATE.SUCCESS && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 flex flex-col items-center justify-center h-full"
                  >
                    <CheckCircle className="h-16 w-16 text-green-500" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Date Available!</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Thank you for your inquiry! We've received your details. You'll be redirected shortly to finalize your booking.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full mt-6">
                       <Button onClick={handleCompleteBooking} className="w-full button-primary-styles">
                         Complete Booking Now
                       </Button>
                       <Button onClick={handleTryAgain} variant="outline" className="w-full button-secondary-styles">
                         Check Another Date
                       </Button>
                    </div>
                  </motion.div>
                )}

                {viewState === VIEW_STATE.ERROR && (
                  <motion.div
                    key="error"
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-4 flex flex-col items-center justify-center h-full"
                  >
                    <AlertCircle className="h-16 w-16 text-red-500" />
                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Submission Failed</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                       {submissionError || "We couldn't submit your inquiry at this time. Please check your details or try again later."}
                    </p>
                     <Button onClick={handleTryAgain} className="w-full button-primary-styles mt-6">
                       Try Different Date
                     </Button>
                  </motion.div>
                )}

                {viewState === VIEW_STATE.SUBMITTING && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full space-y-4"
                  >
                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                    <p className="text-gray-600 dark:text-gray-300">Submitting your inquiry...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

