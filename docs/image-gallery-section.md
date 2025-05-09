# Image Gallery Section Component

A cascading style image gallery component with advanced features including click-to-enlarge functionality, lazy loading, and auto-scroll.

## Features

- **Cascading/Masonry Layout**: Images are arranged in a visually appealing grid with varying sizes
- **Click to Enlarge**: Lightbox functionality with navigation controls
- **Lazy Loading**: Images load only when they're about to enter the viewport
- **Auto Scroll**: Automatic scrolling with adjustable speed
- **Category Filtering**: Filter images by category
- **Responsive Design**: Adapts to different screen sizes
- **Keyboard Navigation**: Use arrow keys to navigate in lightbox mode
- **Caption Support**: Display captions on hover and in lightbox mode

## Usage

Import the component in your page file:

```tsx
import ImageGallerySection from '@/components/sections/ImageGallerySection';

export default function YourPage() {
  return (
    <main>
      {/* Other components */}
      <ImageGallerySection />
      {/* Other components */}
    </main>
  );
}
```

## Component Structure

The component is structured as follows:

1. **Header Section**: Title and description
2. **Controls**: Category filter and auto-scroll controls
3. **Gallery Grid**: Masonry layout of images
4. **Lightbox**: Modal for enlarged image view

## Implementation Details

### Masonry Layout

The gallery uses CSS Grid with auto-placement and varying spans for the masonry effect:

```tsx
<div 
  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(100px,auto)]"
>
  {filteredImages.map((image) => (
    <div 
      key={image.id}
      style={{
        gridColumn: `span ${image.span?.col || 1}`,
        gridRow: `span ${image.span?.row || 1}`,
      }}
    >
      {/* Image content */}
    </div>
  ))}
</div>
```

### Lazy Loading

The component uses Next.js Image component's built-in lazy loading:

```tsx
<Image
  src={image.src}
  alt={image.alt}
  width={image.width}
  height={image.height}
  className="w-full h-full object-cover"
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,..."
/>
```

### Auto Scroll

Auto scroll is implemented using `requestAnimationFrame` for smooth scrolling:

```tsx
useEffect(() => {
  if (!autoScrollActive || !galleryRef.current) return;
  
  let lastTime = 0;
  let animationFrameId: number;
  
  const scrollStep = (timestamp: number) => {
    if (!galleryRef.current) return;
    
    if (!lastTime) lastTime = timestamp;
    const delta = timestamp - lastTime;
    
    // Calculate scroll amount based on speed
    const scrollAmount = (delta * 0.05 * scrollSpeed);
    
    // Scroll the gallery
    galleryRef.current.scrollTop += scrollAmount;
    
    // If we've reached the bottom, loop back to top
    if (galleryRef.current.scrollTop + galleryRef.current.clientHeight >= 
        galleryRef.current.scrollHeight - 10) {
      galleryRef.current.scrollTop = 0;
    }
    
    lastTime = timestamp;
    animationFrameId = requestAnimationFrame(scrollStep);
  };
  
  animationFrameId = requestAnimationFrame(scrollStep);
  
  return () => {
    cancelAnimationFrame(animationFrameId);
  };
}, [autoScrollActive, scrollSpeed]);
```

### Lightbox

The lightbox is implemented as a modal that appears when an image is clicked:

```tsx
{lightboxOpen && (
  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
    <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 text-white">
      <X className="h-8 w-8" />
    </button>
    <button onClick={() => navigateLightbox('prev')} className="absolute left-4 text-white">
      <ChevronLeft className="h-10 w-10" />
    </button>
    <div className="relative max-w-5xl max-h-[90vh]">
      <Image
        src={filteredImages[currentImageIndex].src}
        alt={filteredImages[currentImageIndex].alt}
        width={filteredImages[currentImageIndex].width * 1.5}
        height={filteredImages[currentImageIndex].height * 1.5}
        className="object-contain max-h-[85vh]"
        priority
      />
      {/* Caption */}
    </div>
    <button onClick={() => navigateLightbox('next')} className="absolute right-4 text-white">
      <ChevronRight className="h-10 w-10" />
    </button>
  </div>
)}
```

## Content Structure

The gallery content is defined in `src/content/image-gallery-content.ts`:

```typescript
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
  description: "Browse our collection of memorable events and experiences",
  
  // Gallery images with size information for layout
  images: [
    {
      id: "img1",
      src: "path/to/image.jpg",
      alt: "Image description",
      width: 800,
      height: 600,
      span: { col: 2, row: 2 },
      caption: "Image caption",
      category: "Category"
    },
    // More images...
  ],
  
  // Filter categories
  categories: ["All", "Category1", "Category2", "Category3"]
};
```

## Customization

To customize the gallery:

1. **Content**: Modify the `image-gallery-content.ts` file to change images, titles, and descriptions
2. **Styling**: Update the component's Tailwind classes to match your design system
3. **Behavior**: Adjust the component's state and effects to change its behavior

## Integration Examples

The ImageGallerySection component is integrated in the following pages:

- **Home Page**: As a standalone section showcasing event highlights
- **Event Type Pages**: Replacing the standard gallery with an enhanced version

## Accessibility

The component includes:

- Keyboard navigation for the lightbox
- Proper alt text for all images
- ARIA labels for interactive elements
- Focus management for modal dialogs
