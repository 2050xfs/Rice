// app/about/page.tsx
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { aboutPageContent } from '@/content/about-page-content';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14 lg:pt-20">
        <Image
          src={aboutPageContent.hero.image}
          alt={aboutPageContent.hero.imageAlt}
          data-ai-hint={aboutPageContent.hero.imageHint}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay-gradient from-black/70 via-black/50 to-black/40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 sm:py-32 text-center">
          <p className="section-label-style text-indigo-300">{aboutPageContent.hero.label}</p>
          <h1 className="mt-2 h1-style text-white">
            {aboutPageContent.hero.title}
          </h1>
          <p className="mt-6 body-text-large text-gray-200 max-w-3xl mx-auto">
            {aboutPageContent.hero.description}
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-center">
            <div>
              <p className="section-label-style">{aboutPageContent.story.label}</p>
              <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
                {aboutPageContent.story.title}
              </h2>
              <p className="mt-6 body-text-default text-gray-600 dark:text-gray-300">
                {aboutPageContent.story.paragraph1}
              </p>
              <p className="mt-4 body-text-default text-gray-600 dark:text-gray-300">
                {aboutPageContent.story.paragraph2}
              </p>
            </div>
            <div className="mt-12 lg:mt-0 relative">
              <Image
                src={aboutPageContent.story.image} 
                alt={aboutPageContent.story.imageAlt}
                data-ai-hint={aboutPageContent.story.imageHint}
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
            <p className="section-label-style">{aboutPageContent.team.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {aboutPageContent.team.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {aboutPageContent.team.members.map((member) => (
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
            <p className="section-label-style">{aboutPageContent.values.label}</p>
            <h2 className="mt-2 h2-style text-gray-900 dark:text-white">
              {aboutPageContent.values.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutPageContent.values.items.map((value) => (
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
            {aboutPageContent.cta.title}
          </h2>
          <p className="mt-6 body-text-large text-indigo-100">
            {aboutPageContent.cta.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={aboutPageContent.cta.button1Link} passHref>
              <Button size="lg" className="button-primary-styles bg-white text-primary hover:bg-gray-100">
                {aboutPageContent.cta.button1Text}
              </Button>
            </Link>
             <Link href={aboutPageContent.cta.button2Link} passHref>
                 <Button size="lg" variant="outline" className="button-secondary-styles border-white/50 text-white hover:bg-white/10 hover:text-white" hasShimmer>
                    {aboutPageContent.cta.button2Text}
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
