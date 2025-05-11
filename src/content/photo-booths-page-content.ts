// src/content/photo-booths-page-content.ts
import type { LucideIcon } from 'lucide-react';
import { CheckCircle, Zap, Gem, Users, SlidersHorizontal, Camera, Printer, Aperture, Share } from 'lucide-react';
import {
  photoBoothsHeroBgNew, // Updated variable name
  booth360MainImg, booth360Gallery1Img, booth360Gallery2Img, booth360Gallery3Img,
  boothLuxxMainImg, boothLuxxGallery1Img, boothLuxxGallery2Img, boothLuxxGallery3Img,
  boothLuxxGallery4Img, boothLuxxGallery5Img, boothLuxxGallery6Img, boothLuxxGallery7Img,
  boothLuxxGallery8Img, boothLuxxGallery9Img, boothLuxxGallery10Img, boothLuxxGallery11Img,
  boothLuxxGallery12Img, boothLuxxGallery13Img, boothLuxxGallery14Img,
  boothSocialMainImg, boothSocialGallery1Img, boothSocialGallery2Img, boothSocialGallery3Img,
  boothSocialGallery4Img, boothSocialGallery5Img, boothSocialGallery6Img, boothSocialGallery7Img,
  boothSocialGallery8Img, boothSocialGallery9Img
} from '@/lib/image-urls';
import type { HeroTitlePart, HeroFeature } from '@/components/sections/PageHero';

export interface PhotoBoothGalleryItem {
  src: string;
  alt: string;
  hint: string;
}

export interface PhotoBoothType {
  id: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  features: string[];
  dimensions: string;
  outputs: string[];
  image: string; // This will be the video src for video booths
  imageHint: string;
  poster?: string; // Optional: for video booths, URL of an image to show as thumbnail
  gallery: PhotoBoothGalleryItem[];
}

export interface PhotoBoothAddOn {
    icon: LucideIcon;
    name: string;
    description: string;
}

export const photoBoothsPageContent = {
  hero: {
    badgeText: "Premium Photo Experience",
    titleParts: [
      { text: "Capture Moments with our", highlight: false },
      { text: "Premium Photo Booth Services", highlight: true }
    ] as HeroTitlePart[],
    description: "Capture memorable moments with our premium photo booth experiences perfect for any event from casual gatherings to luxury weddings.",
    features: [
      { text: "High-quality DSLR cameras", icon: Camera },
      { text: "Instant printing", icon: Printer },
      { text: "Custom backdrops", icon: Aperture },
      { text: "Digital sharing", icon: Share },
    ] as HeroFeature[],
    image: photoBoothsHeroBgNew, 
    imageAlt: "Premium 360 photo booth setup with gold backdrop",
    imageHint: "360 photo booth gold",
    ctaButtonText: "Schedule a Demo", 
    secondaryCtaText: "View Booth Types", 
    secondaryCtaLink: "#booth-types-section" 
  },
  booths: {
    label: "Choose Your Booth",
    title: "Find the Perfect Fit for Your Event",
    items: [
      {
        id: '360booth',
        name: '360 Photo Booth',
        icon: Zap,
        tagline: 'Dynamic Videos, Unforgettable Moments',
        description: 'Step onto the platform and let our camera spin around you, capturing stunning 360-degree slow-motion videos. Perfect for high-energy events and creating shareable content.',
        features: [
          'Slow-motion video capture',
          'Instant sharing via QR/email/text',
          'Customizable overlays & music',
          'Professional lighting',
          'On-site attendant',
        ],
        dimensions: 'Platform: 3-4 ft diameter, Requires approx. 10x10 ft space',
        outputs: ['MP4 Video Files', 'GIFs'],
        image: booth360MainImg, // This is a JPEG, assuming it's representative, or it's the video if it's an MP4
        imageHint: '360 photo booth action',
        // poster: booth360Gallery1Img, // Example if 360booth also had a video main image
        gallery: [
          { src: booth360Gallery1Img, alt: '360 Booth Output Example 1', hint: "video booth spin" },
          { src: booth360Gallery2Img, alt: '360 Booth Setup Example', hint: "event setup" },
          { src: booth360Gallery3Img, alt: 'Guests enjoying 360 Booth', hint: "party fun" },
        ],
      },
      {
        id: 'luxxbooth',
        name: 'Luxx Booth',
        icon: Gem,
        tagline: 'Glamorous Photos, Timeless Elegance',
        description: 'Our Luxx Booth delivers high-quality, studio-style photos with a flattering beauty filter. Ideal for weddings and upscale events where a touch of glamour is desired.',
        features: [
          'High-resolution DSLR camera',
          'Beauty filter for flawless skin',
          'Choice of premium backdrops',
          'Professional studio lighting',
          'Instant prints & digital sharing',
        ],
        dimensions: 'Requires approx. 8x8 ft space',
        outputs: ['High-Quality Prints (2x6, 4x6)', 'Digital Photos'],
        image: boothLuxxMainImg, // This is an MP4 video
        imageHint: 'luxury photo booth video',
        poster: boothLuxxGallery1Img, // Use a static image as poster. Replace with actual 02-second frame image URL
        gallery: [
          { src: boothLuxxGallery1Img, alt: 'Luxx Booth Glam Shot', hint: "glamour portrait" },
          { src: boothLuxxGallery2Img, alt: 'Luxx Booth Print Example', hint: "photo strip" },
          { src: boothLuxxGallery3Img, alt: 'Luxx Booth Setup Detail', hint: "elegant setup" },
          { src: boothLuxxGallery4Img, alt: 'Luxx Photo Booth with Backdrop', hint: "photo booth backdrop" },
          { src: boothLuxxGallery5Img, alt: 'Luxx Booth with Backdrop and Props', hint: "photo booth props" },
          { src: boothLuxxGallery6Img, alt: 'Luxx Photobooth with Backdrop', hint: "photobooth setup" },
          { src: boothLuxxGallery7Img, alt: 'Luxx Photobooth with Props', hint: "photobooth props" },
          { src: boothLuxxGallery8Img, alt: 'Luxx Photo Booth with Backdrop', hint: "photo booth backdrop" },
          { src: boothLuxxGallery9Img, alt: 'Luxx Photo Booth with Backdrop', hint: "photo booth backdrop" },
          { src: boothLuxxGallery10Img, alt: 'Luxx Photobooth Countdown', hint: "photobooth countdown" },
          { src: boothLuxxGallery11Img, alt: 'Luxx Photobooth Digital', hint: "photobooth digital" },
          { src: boothLuxxGallery12Img, alt: 'Luxx Booth Display', hint: "booth display" },
          { src: boothLuxxGallery13Img, alt: 'Luxx Photo Booth Digital', hint: "photo booth digital" },
          { src: boothLuxxGallery14Img, alt: 'Luxx Photo Booth Sephora', hint: "photo booth sephora" },
        ],
      },
      {
        id: 'socialbooth',
        name: 'Social Booth',
        icon: Users,
        tagline: 'Fun & Shareable, Instantly Engaging',
        description: 'The Social Booth is all about fun, animated GIFs, boomerangs, and digital props. Designed for maximum social media engagement and easy sharing.',
        features: [
          'Photos, GIFs, Boomerangs',
          'Digital props & filters',
          'Instant sharing to social media',
          'Customizable branding',
          'Compact setup',
        ],
        dimensions: 'Requires approx. 6x6 ft space',
        outputs: ['Digital Photos', 'GIFs', 'Boomerangs'],
        image: boothSocialMainImg,
        imageHint: 'social media photo booth',
        gallery: [
          { src: boothSocialGallery1Img, alt: 'Social Booth GIF Example', hint: "animated gif" },
          { src: boothSocialGallery2Img, alt: 'Guests with Digital Props', hint: "digital props" },
          { src: boothSocialGallery3Img, alt: 'Social Booth Sharing Interface', hint: "sharing screen" },
          { src: boothSocialGallery4Img, alt: 'Social Booth Setup', hint: "booth setup" },
          { src: boothSocialGallery5Img, alt: 'Social Photobooth Happy Holidays', hint: "holiday photobooth" },
          { src: boothSocialGallery6Img, alt: 'Social Photo Booth Founders', hint: "founders event" },
          { src: boothSocialGallery7Img, alt: 'Social Photo Booth Founders Animation', hint: "founders animation" },
          { src: boothSocialGallery8Img, alt: 'Social Photo Booth Digital', hint: "digital output" },
          { src: boothSocialGallery9Img, alt: 'Social Photobooth Founders', hint: "founders event" },
        ],
      },
    ] as PhotoBoothType[],
    galleryTitle: "Sample Outputs & Setup",
    featureIcon: CheckCircle,
  },
  addOns: {
    label: "Enhance Your Experience",
    title: "Popular Add-Ons & Customizations",
    description: "Personalize your photo booth experience with our range of exciting add-ons.",
    items: [
      { icon: SlidersHorizontal, name: 'Custom Backdrops', description: 'Tailor the look with a unique backdrop matching your theme.' },
      { icon: SlidersHorizontal, name: 'Premium Prop Box', description: 'An extensive collection of high-quality, themed props.' },
      { icon: SlidersHorizontal, name: 'Guest Book Album', description: 'A beautiful album where guests can leave a copy of their photo strip and a message.' },
      { icon: SlidersHorizontal, name: 'Roaming Photographer Add-on', description: 'Capture candid moments throughout your event.' },
      { icon: SlidersHorizontal, name: 'Extended Hours', description: 'Keep the fun going longer!' },
      { icon: SlidersHorizontal, name: 'Custom Start Screens & Animations', description: 'Brand the entire experience, from start to finish.' },
    ] as PhotoBoothAddOn[],
  },
  cta: {
    title: "Ready to Add Some Fun to Your Event?",
    description: "Our photo booths are more than just pictures; they're memory-making machines. Let's discuss how we can customize the perfect photo experience for your guests.",
    buttonText: "Inquire About Photo Booths",
  }
};
