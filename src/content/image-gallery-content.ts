// src/content/image-gallery-content.ts
import type { LucideIcon } from 'lucide-react';
import {
  lightingGalleryImg1,
  lightingGalleryImg2,
  lightingGalleryImg3,
  lightingGalleryImg4,
  djPackageEssentialBeatsImg,
  djPackagePremiumSoundImg,
  djPackageUltimateExperienceImg,
  booth360MainImg,
  booth360Gallery1Img,
  booth360Gallery2Img,
  booth360Gallery3Img,
  boothLuxxGallery1Img,
  boothLuxxGallery2Img,
  boothLuxxGallery3Img,
  boothLuxxGallery5Img,
  boothLuxxGallery7Img,
  boothLuxxGallery13Img,
  boothSocialMainImg,
  boothSocialGallery1Img,
  boothSocialGallery2Img,
  boothSocialGallery3Img,
  boothSocialGallery4Img,
  boothSocialGallery6Img,
  boothSocialGallery7Img,
  weddingsGalleryImage1,
  weddingsGalleryImage2,
  weddingsGalleryImage3,
  corporateGalleryImage1,
  corporateGalleryImage2,
  corporateGalleryImage3,
  privatePartiesGalleryImage1,
  privatePartiesGalleryImage2,
  privatePartiesGalleryImage3,
  serviceOverviewDjImg,
  serviceOverviewPhotoBoothImg,
  aboutHeroImage,
  companyTimelineImage
} from '@/lib/image-urls';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  span?: {
    col: number;
    row: number;
  };
  caption?: string;
  category?: string;
}

export const imageGalleryContent = {
  title: "Creating Unforgettable Moments",
  subtitle: "Event Gallery",
  description: "Experience the energy and excitement of our events through our gallery. From elegant weddings to dynamic corporate gatherings, we bring the perfect atmosphere to every celebration.",
  
  // Gallery images with size information for layout
  images: [
    // First row - Wedding feature image
    {
      id: "img1",
      src: weddingsGalleryImage1,
      alt: "Wedding celebration",
      width: 800,
      height: 600,
      span: { col: 2, row: 2 },
      caption: "Magical wedding moments",
      category: "Wedding"
    },
    // Corporate event images
    {
      id: "img3",
      src: corporateGalleryImage2,
      alt: "Business presentation",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Business networking event",
      category: "Corporate"
    },
    {
      id: "img4",
      src: corporateGalleryImage3,
      alt: "Corporate celebration",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Corporate celebration event",
      category: "Corporate"
    },
    // Second row - Photo booth feature
    {
      id: "img5",
      src: booth360MainImg,
      alt: "360 Photo Booth",
      width: 800,
      height: 600,
      span: { col: 2, row: 2 },
      caption: "Dynamic 360 photo booth experience",
      category: "Photo Booth"
    },
    // Party images
    {
      id: "img6",
      src: privatePartiesGalleryImage1,
      alt: "Private party",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Fun private celebration",
      category: "Party"
    },
    {
      id: "img7",
      src: privatePartiesGalleryImage2,
      alt: "Party lighting",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Colorful lighting for private event",
      category: "Party"
    },
    {
      id: "img8",
      src: privatePartiesGalleryImage3,
      alt: "Party atmosphere",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Energetic party atmosphere",
      category: "Party"
    },
    // Fourth row - Photo booth experiences
    {
      id: "img11",
      src: boothLuxxGallery1Img,
      alt: "Luxx Booth Glam Shot",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Elegant glamour portrait from Luxx Booth",
      category: "Photo Booth"
    },
    {
      id: "img12",
      src: booth360Gallery1Img,
      alt: "360 Booth Output",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Stunning 360 video booth spin effect",
      category: "Photo Booth"
    },
    {
      id: "img13",
      src: boothSocialGallery1Img,
      alt: "Social Booth GIF",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Animated GIF from our Social Booth",
      category: "Photo Booth"
    },
    {
      id: "img14",
      src: serviceOverviewPhotoBoothImg,
      alt: "Photo Booth Experience",
      width: 800,
      height: 400,
      span: { col: 2, row: 1 },
      caption: "Guests enjoying our photo booth experience",
      category: "Photo Booth"
    },
    // Fifth row - DJ and lighting
    {
      id: "img15",
      src: djPackageEssentialBeatsImg,
      alt: "DJ Performance",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "DJ creating the perfect atmosphere",
      category: "Party"
    },
    {
      id: "img16",
      src: serviceOverviewDjImg,
      alt: "Professional DJ Service",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Our professional DJ in action",
      category: "Party"
    },
    {
      id: "img17",
      src: lightingGalleryImg1,
      alt: "Premium Lighting Setup",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Custom lighting design for events",
      category: "Corporate"
    },
    {
      id: "img18",
      src: lightingGalleryImg3,
      alt: "Party Lighting Effects",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Dynamic lighting for dance floor",
      category: "Party"
    },
    {
      id: "img19",
      src: lightingGalleryImg4,
      alt: "Outdoor Event Lighting",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Outdoor evening event illumination",
      category: "Corporate"
    },
    // About images - mix of cell sizes
    {
      id: "img23",
      src: aboutHeroImage,
      alt: "Rice Entertainment Team",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Our dedicated team of professionals",
      category: "Corporate"
    },
    {
      id: "img24",
      src: companyTimelineImage,
      alt: "Company Event History",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "Highlights from our event history",
      category: "Corporate"
    },
    // Additional Luxx Booth images
    {
      id: "img25",
      src: boothLuxxGallery5Img,
      alt: "Luxx Booth with Backdrop and Props",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Elegant Luxx Booth with custom backdrop and props",
      category: "Photo Booth"
    },
    {
      id: "img26",
      src: boothLuxxGallery7Img,
      alt: "Luxx Photobooth with Props",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Guests enjoying the Luxx Photobooth with props",
      category: "Photo Booth"
    },
    {
      id: "img28",
      src: boothLuxxGallery13Img,
      alt: "Luxx Photo Booth Digital",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Digital output from Luxx Photo Booth",
      category: "Photo Booth"
    },
    // Additional Social Booth images
    {
      id: "img29",
      src: boothSocialGallery4Img,
      alt: "Social Booth Setup",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Social Booth setup with custom backdrop",
      category: "Photo Booth"
    },
    {
      id: "img30",
      src: boothSocialGallery6Img,
      alt: "Social Photo Booth Founders",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Social Photo Booth at a founders event",
      category: "Photo Booth"
    },
    {
      id: "img31",
      src: boothSocialGallery7Img,
      alt: "Social Photo Booth Animation",
      width: 800,
      height: 400,
      span: { col: 2, row: 1 },
      caption: "Animated GIF from Social Photo Booth",
      category: "Photo Booth"
    },
    // Additional GIF animations
    {
      id: "img32",
      src: "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/66ce6bad8f5bec770aa6b4d9.gif",
      alt: "Photo Booth Animation 1",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Fun animated moments from our photo booth",
      category: "Photo Booth"
    },
    {
      id: "img33",
      src: "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/66ce6badda06ef21835d4791.gif",
      alt: "Photo Booth Animation 2",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Creative photo booth animations",
      category: "Photo Booth"
    },
    // Additional Wedding Photos
    {
      id: "img34",
      src: "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/66ce6bae8f5bec22e9a6b4ea.jpeg",
      alt: "Lauren & Ryan Wedding",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "Beautiful wedding celebration moments",
      category: "Wedding"
    },
    {
      id: "img35",
      src: "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/66ce6bae8f5bec3ed7a6b4eb.jpeg",
      alt: "Wedding Dance Floor",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Guests enjoying the wedding dance floor",
      category: "Wedding"
    },
    // Additional Corporate Events
    {
      id: "img37",
      src: "https://storage.googleapis.com/msgsndr/iAR0shcsJ7fDRLUy9mAx/media/66ce6bae654dde1e2d835c32.jpeg",
      alt: "DCAC 15 Year Celebration",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "DCAC's 15th anniversary celebration",
      category: "Corporate"
    }
  ] as GalleryImage[],
  
  // Filter categories
  categories: ["All", "Wedding", "Corporate", "Party", "Photo Booth"]
};


    