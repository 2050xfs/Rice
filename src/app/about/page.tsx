// app/about/page.tsx
import Image from 'next/image';
import { CheckCircle, Users, Target, Award, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Placeholder image URLs - replace with actuals from image-urls.ts if available
const aboutHeroImage = "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/placeholder_random_90.jpeg";
const teamMember1Image = "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/placeholder_random_91.jpeg";
const teamMember2Image = "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/placeholder_random_92.jpeg";
const companyTimelineImage = "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/placeholder_random_93.jpeg";


const teamMembers = [
  {
    name: 'Alex "DJ RICE" Nguyen',
    role: 'Founder & Lead DJ/MC',
    bio: 'With over a decade of experience, Alex founded Rice Entertainment to bring a new level of professionalism and fun to events. His passion for music and creating unforgettable moments is the driving force behind the company.',
    image: teamMember1Image,
    imageHint: "male portrait professional"
  },
  {
    name: 'Jamie "Nova" Lee',
    role: 'Lead Photo Booth Technician & DJ',
    bio: 'Jamie is a tech enthusiast with an eye for detail. She ensures every photo booth experience is seamless and manages our cutting-edge equipment. Also a talented DJ, she brings versatility to the team.',
    image: teamMember2Image,
    imageHint: "female portrait creative"
  },
];

const companyValues = [
  { icon: Target, title: 'Client Focus', description: 'Your vision is our priority. We listen, collaborate, and customize to make your event uniquely yours.' },
  { icon: Award, title: 'Quality & Professionalism', description: 'From top-tier equipment to experienced staff, we deliver excellence in every aspect of our service.' },
  { icon: Handshake, title: 'Integrity & Reliability', description: 'We believe in transparent communication and dependable service you can count on.' },
  { icon: Users, title: 'Fun & Engagement', description: 'Our goal is to create joyful, interactive experiences that leave lasting memories for you and your guests.' },
];

export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src={aboutHeroImage}
          alt="Team celebrating at an event"
          data-ai-hint="team event celebration"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/70 via-black/50 to-black/40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">Who We Are</p>
          <h1 className="mt-2 h1-style text-white">
            About Rice Entertainment
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            Founded on the principle of creating unforgettable experiences, Rice Entertainment has been serving joy and professionalism to events of all sizes for over [Number] years. We specialize in dynamic DJ services and interactive photo booths that elevate any celebration.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
            <div>
              <p className="section-label-style">Our Journey</p>
              <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                The Story Behind the Music
              </h2>
              <p className="mt-6 body-text-default text-gray-600 dark:text-gray-300">
                Rice Entertainment started from a simple love for music and a desire to make events more engaging and memorable. What began as a small DJ operation quickly grew as clients recognized our commitment to quality, personalized service, and genuine enthusiasm.
              </p>
              <p className="mt-4 body-text-default text-gray-600 dark:text-gray-300">
                Over the years, we've expanded our offerings to include state-of-the-art photo booths and streamlined event planning tools like our VIBO app. Our mission remains the same: to provide exceptional entertainment solutions that exceed expectations and create lasting positive memories. We are proud to have been a part of hundreds of weddings, corporate functions, and private parties, each one unique and special.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 relative">
              <Image
                src={companyTimelineImage} 
                alt="Collage of past Rice Entertainment events or team milestones"
                data-ai-hint="event collage timeline"
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
            <p className="section-label-style">Our Experts</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              Meet the Faces Behind the Fun
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {teamMembers.map((member) => (
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
            <p className="section-label-style">Our Philosophy</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              Driven by Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value) => (
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
            Let's Make Your Next Event Unforgettable
          </h2>
          <p className="mt-6 body-text-large text-indigo-100">
            Ready to partner with a team that's passionate about making your celebration a success? Get in touch with Rice Entertainment today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" passHref>
              <Button size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
             <Link href="/services/dj-services" passHref>
                 <Button size="lg" variant="outline" className="button-secondary-styles border-white/50 text-white hover:bg-white/10 hover:text-white" hasShimmer>
                    Explore Our Services
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
