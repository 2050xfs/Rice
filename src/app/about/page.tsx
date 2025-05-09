// app/about/page.tsx
"use client"; // Added "use client" for useBookingModal hook
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { aboutPageContent } from '@/content/about-page-content';
import { useBookingModal } from '@/context/BookingModalContext'; // Import useBookingModal

export default function AboutPage() {
  const { openModal } = useBookingModal(); // Initialize useBookingModal
  const { hero, story, team, values, cta } = aboutPageContent;

  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          data-ai-hint={hero.imageHint}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/70 via-black/50 to-black/40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">{hero.label}</p>
          <h1 className="mt-2 h1-style text-white">
            {hero.title}
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            {hero.description}
          </p>
          {/* CTA Button added to Hero Section */}
          <div className="mt-10">
            <Button onClick={openModal} size="lg" className="button-primary-styles">
              {hero.ctaButtonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
            <div>
              <p className="section-label-style">{story.label}</p>
              <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                {story.title}
              </h2>
              <p className="mt-6 body-text-default text-gray-600 dark:text-gray-300">
                {story.paragraph1}
              </p>
              <p className="mt-4 body-text-default text-gray-600 dark:text-gray-300">
                {story.paragraph2}
              </p>
            </div>
            <div className="mt-12 lg:mt-0 relative">
              <Image
                src={story.image} 
                alt={story.imageAlt}
                data-ai-hint={story.imageHint}
                width={700}
                height={500}
                className="rounded-xl shadow-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Meet the Team Section */}
      <div className="bg-gray-100 dark:bg-gray-900 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">{team.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {team.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {team.members.map((member) => (
              <div key={member.name} className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  data-ai-hint={member.imageHint}
                  width={120}
                  height={120}
                  className="rounded-full object-cover w-32 h-32 shrink-0"
                />
                <div>
                  <h3 className="h3-style text-xl text-gray-900 dark:text-white">{member.name}</h3>
                  <p className="text-primary dark:text-indigo-400 font-semibold">{member.role}</p>
                  <p className="mt-2 body-text-small text-gray-500 dark:text-gray-400">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center mb-16">
            <p className="section-label-style">{values.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {values.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.items.map((value) => (
              <div key={value.title} className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-lg text-center">
                <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20">
                        <value.icon className="h-8 w-8 text-primary" />
                    </div>
                </div>
                <h3 className="h3-style text-lg text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="body-text-small text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="h2-style text-white">
            {cta.title}
          </h2>
          <p className="mt-6 body-text-large text-indigo-100">
            {cta.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={cta.button1Link} passHref>
              <Button size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                {cta.button1Text}
              </Button>
            </Link>
             <Link href={cta.button2Link} passHref>
                 <Button size="lg" variant="outline" className="button-secondary-styles border-white/50 text-white hover:bg-white/10 hover:text-white" hasShimmer>
                    {cta.button2Text}
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
