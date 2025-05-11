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
  boothLuxxGallery10Img,
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
  title: "Moments That Define Excellence",
  subtitle: "Our work speaks for itself",
  description: "Browse through our collection of memorable events and experiences",
  
  // Gallery images with size information for layout
  images: [
    // Featured photo booth image - large cell (2x2)
    {
      id: "img1",
      src: booth360MainImg,
      alt: "360 Photo Booth",
      width: 800,
      height: 600,
      span: { col: 2, row: 2 },
      caption: "Dynamic 360 photo booth experience",
      category: "Photo Booth"
    },
    // Lighting images - mix of cell sizes
    {
      id: "img2",
      src: lightingGalleryImg1,
      alt: "Premium Lighting Setup",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Custom lighting design for corporate event",
      category: "Corporate"
    },
    {
      id: "img3",
      src: lightingGalleryImg2,
      alt: "Wedding Venue Lighting",
      width: 400,
      height: 600,
      span: { col: 1, row: 2 },
      caption: "Atmospheric lighting for wedding reception",
      category: "Wedding"
    },
    {
      id: "img4",
      src: lightingGalleryImg3,
      alt: "Party Lighting Effects",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Dynamic lighting for dance floor",
      category: "Party"
    },
    {
      id: "img5",
      src: lightingGalleryImg4,
      alt: "Outdoor Event Lighting",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "Outdoor evening event illumination",
      category: "Corporate"
    },
    // DJ images - mix of cell sizes
    {
      id: "img6",
      src: djPackageEssentialBeatsImg,
      alt: "DJ Performance",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "DJ creating the perfect atmosphere",
      category: "Party"
    },
    {
      id: "img7",
      src: serviceOverviewDjImg,
      alt: "Professional DJ Service",
      width: 400,
      height: 600,
      span: { col: 1, row: 2 },
      caption: "Our professional DJ in action",
      category: "Party"
    },
    {
      id: "img8",
      src: djPackagePremiumSoundImg,
      alt: "Premium Sound System",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Premium sound system setup",
      category: "Corporate"
    },
    {
      id: "img9",
      src: djPackageUltimateExperienceImg,
      alt: "Ultimate DJ Experience",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "The ultimate DJ experience for weddings",
      category: "Wedding"
    },
    // Photo booth images - mix of cell sizes
    {
      id: "img10",
      src: booth360Gallery1Img,
      alt: "360 Booth Output Example",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Stunning 360 video booth spin effect",
      category: "Photo Booth"
    },
    {
      id: "img11",
      src: booth360Gallery2Img,
      alt: "360 Booth Setup",
      width: 400,
      height: 600,
      span: { col: 1, row: 2 },
      caption: "Professional 360 booth event setup",
      category: "Photo Booth"
    },
    {
      id: "img12",
      src: boothLuxxGallery1Img,
      alt: "Luxx Booth Glam Shot",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Elegant glamour portrait from Luxx Booth",
      category: "Photo Booth"
    },
    {
      id: "img13",
      src: boothLuxxGallery2Img,
      alt: "Luxx Booth Print Example",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "High-quality photo strip from Luxx Booth",
      category: "Photo Booth"
    },
    {
      id: "img14",
      src: boothSocialMainImg,
      alt: "Social Booth Setup",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "Engaging Social Booth for maximum fun",
      category: "Photo Booth"
    },
    {
      id: "img15",
      src: boothSocialGallery1Img,
      alt: "Social Booth GIF Example",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Animated GIF from our Social Booth",
      category: "Photo Booth"
    },
    // Wedding images - mix of cell sizes
    {
      id: "img16",
      src: weddingsGalleryImage1,
      alt: "Wedding First Dance",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "Magical first dance moment",
      category: "Wedding"
    },
    {
      id: "img17",
      src: weddingsGalleryImage2,
      alt: "Wedding Guests Dancing",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Guests enjoying the dance floor",
      category: "Wedding"
    },
    {
      id: "img18",
      src: serviceOverviewPhotoBoothImg,
      alt: "Photo Booth Experience",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "Guests enjoying our photo booth experience",
      category: "Photo Booth"
    },
    // Corporate images - mix of cell sizes
    {
      id: "img19",
      src: corporateGalleryImage1,
      alt: "Corporate Presentation",
      width: 400,
      height: 600,
      span: { col: 1, row: 2 },
      caption: "Professional business presentation",
      category: "Corporate"
    },
    {
      id: "img20",
      src: corporateGalleryImage2,
      alt: "Corporate Networking",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Business networking event",
      category: "Corporate"
    },
    // Party images - mix of cell sizes
    {
      id: "img21",
      src: privatePartiesGalleryImage1,
      alt: "Private Party Fun",
      width: 800,
      height: 300,
      span: { col: 2, row: 1 },
      caption: "Friends enjoying a private celebration",
      category: "Party"
    },
    {
      id: "img22",
      src: privatePartiesGalleryImage2,
      alt: "Party Lighting Design",
      width: 600,
      height: 300,
      span: { col: 1, row: 1 },
      caption: "Colorful lighting design for private event",
      category: "Party"
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
      id: "img27",
      src: boothLuxxGallery10Img,
      alt: "Luxx Photobooth Countdown",
      width: 400,
      height: 600,
      span: { col: 1, row: 2 },
      caption: "Luxx Photobooth countdown display",
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
    }
  ] as GalleryImage[],
  
  // Filter categories
  categories: ["All", "Wedding", "Corporate", "Party", "Photo Booth"]
};
