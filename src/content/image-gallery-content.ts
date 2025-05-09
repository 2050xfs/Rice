// src/content/image-gallery-content.ts
import type { LucideIcon } from 'lucide-react';
import {
  testimonialMountainHouse,
  testimonialOceanHotel,
  testimonialMadreya,
  testimonialEmily1,
  testimonialJackieG,
  testimonialAyaD,
  testimonialEmily2,
  testimonialPlaceholder8,
  testimonialSarahNew,
  testimonialCheriM,
  testimonialMichaelNew,
  testimonialJasonW,
  lightingGalleryImg1,
  lightingGalleryImg2,
  lightingGalleryImg3,
  lightingGalleryImg4,
  djPackageEssentialBeatsImg,
  djPackagePremiumSoundImg,
  djPackageUltimateExperienceImg,
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
    {
      id: "img1",
      src: testimonialMountainHouse,
      alt: "Mountain House Wedding",
      width: 800,
      height: 600,
      span: { col: 2, row: 2 },
      caption: "Elegant wedding at Mountain House",
      category: "Wedding"
    },
    {
      id: "img2",
      src: testimonialOceanHotel,
      alt: "Ocean Hotel Corporate Event",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Corporate gathering at Ocean Hotel",
      category: "Corporate"
    },
    {
      id: "img3",
      src: testimonialMadreya,
      alt: "Madreya Resort Party",
      width: 600,
      height: 800,
      span: { col: 1, row: 2 },
      caption: "Summer celebration at Madreya Resort",
      category: "Party"
    },
    {
      id: "img4",
      src: testimonialEmily1,
      alt: "Emily's Wedding",
      width: 800,
      height: 600,
      span: { col: 2, row: 1 },
      caption: "Emily & Michael's wedding reception",
      category: "Wedding"
    },
    {
      id: "img5",
      src: testimonialJackieG,
      alt: "Jackie's Graduation Party",
      width: 600,
      height: 600,
      span: { col: 1, row: 1 },
      caption: "Jackie's graduation celebration",
      category: "Party"
    },
    {
      id: "img6",
      src: testimonialAyaD,
      alt: "Aya's Corporate Event",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Annual corporate gala",
      category: "Corporate"
    },
    {
      id: "img7",
      src: testimonialEmily2,
      alt: "Emily's Anniversary",
      width: 800,
      height: 600,
      span: { col: 2, row: 1 },
      caption: "5-year anniversary celebration",
      category: "Party"
    },
    {
      id: "img8",
      src: testimonialPlaceholder8,
      alt: "Beach Wedding Setup",
      width: 600,
      height: 800,
      span: { col: 1, row: 2 },
      caption: "Beachside wedding ceremony",
      category: "Wedding"
    },
    {
      id: "img9",
      src: testimonialSarahNew,
      alt: "Sarah's Birthday",
      width: 600,
      height: 600,
      span: { col: 1, row: 1 },
      caption: "Sarah's 30th birthday bash",
      category: "Party"
    },
    {
      id: "img10",
      src: testimonialCheriM,
      alt: "Cheri's Wedding",
      width: 800,
      height: 600,
      span: { col: 2, row: 1 },
      caption: "Cheri & Mark's wedding day",
      category: "Wedding"
    },
    {
      id: "img11",
      src: lightingGalleryImg1,
      alt: "Premium Lighting Setup",
      width: 600,
      height: 400,
      span: { col: 1, row: 1 },
      caption: "Custom lighting design for corporate event",
      category: "Corporate"
    },
    {
      id: "img12",
      src: lightingGalleryImg2,
      alt: "Wedding Venue Lighting",
      width: 600,
      height: 800,
      span: { col: 1, row: 2 },
      caption: "Atmospheric lighting for wedding reception",
      category: "Wedding"
    },
    {
      id: "img13",
      src: lightingGalleryImg3,
      alt: "Party Lighting Effects",
      width: 600,
      height: 600,
      span: { col: 1, row: 1 },
      caption: "Dynamic lighting for dance floor",
      category: "Party"
    },
    {
      id: "img14",
      src: lightingGalleryImg4,
      alt: "Outdoor Event Lighting",
      width: 800,
      height: 600,
      span: { col: 2, row: 1 },
      caption: "Outdoor evening event illumination",
      category: "Corporate"
    },
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
      src: djPackagePremiumSoundImg,
      alt: "Premium Sound System",
      width: 600,
      height: 600,
      span: { col: 1, row: 1 },
      caption: "Premium sound system setup",
      category: "Corporate"
    },
    {
      id: "img17",
      src: djPackageUltimateExperienceImg,
      alt: "Ultimate DJ Experience",
      width: 800,
      height: 600,
      span: { col: 2, row: 1 },
      caption: "The ultimate DJ experience for weddings",
      category: "Wedding"
    },
    {
      id: "img18",
      src: testimonialMichaelNew,
      alt: "Michael's Corporate Event",
      width: 600,
      height: 800,
      span: { col: 1, row: 2 },
      caption: "Executive retreat event",
      category: "Corporate"
    }
  ] as GalleryImage[],
  
  // Filter categories
  categories: ["All", "Wedding", "Corporate", "Party"]
};
