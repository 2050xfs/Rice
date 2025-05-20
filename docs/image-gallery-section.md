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
- **Customizable Props**: Configure title, subtitle, description, and more

## Usage

Import the component in your page file:

```tsx
import ImageGallerySection from '@/components/sections/ImageGallerySection';

export default function YourPage() {
  return (
    <main>
      {/* Basic usage with default settings */}
      <ImageGallerySection />
      
      {/* Customized usage with props */}
      <ImageGallerySection 
        title="Creating Unforgettable Moments"
        subtitle="Event Gallery"
        description="Experience the energy and excitement of our events through our gallery."
        showControls={false}
        maxHeight="900px"
      />
    </main>
  );
}
```

## Component Props

The component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | From content file | The main title displayed in the gallery header |
| `subtitle` | string | "Event Gallery" | The subtitle/label displayed above the title |
| `description` | string | From content file | The descriptive text below the title |
| `showControls` | boolean | true | Whether to show category filter and auto-scroll controls |
| `customImages` | GalleryImage[] | undefined | Optional custom images array to override the default images |
| `maxHeight` | string | "800px" | Maximum height of the gallery container |
| `className` | string | "" | Additional CSS classes to apply to the gallery grid |

## Component Structure

The component is structured as follows:

1. **Header Section**: Customizable title, subtitle, and description
2. **Controls**: Optional category filter and auto-scroll controls (can be hidden)
3. **Gallery Grid**: Masonry layout of images with configurable sizing
4. **Lightbox**: Modal for enlarged image view with navigation

## Implementation Details

### Masonry Layout

The gallery uses CSS Grid with auto-placement and varying spans for the masonry effect:

```tsx
<div 
  ref={galleryRef}
  className={cn(
    "grid gap-4",
    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    "auto-rows-[minmax(200px,auto)]",
    "overflow-y-auto scrollbar-thin",
    "scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent overscroll-y-contain",
    className
  )}
  style={{ maxHeight }}
>
  {filteredImages.map((image, index) => (
    <div 
      key={image.id}
      className="relative cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
      style={{
        gridColumn: `span ${image.span?.col || 1}`,
        gridRow: `span ${image.span?.row || 1}`,
      }}
      onClick={() => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
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

1. **Props**: Use the component props to customize the appearance and behavior
2. **Content**: Modify the `image-gallery-content.ts` file to change images, titles, and descriptions
3. **Styling**: Update the component's Tailwind classes to match your design system
4. **Behavior**: Adjust the component's state and effects to change its behavior

### Example: Customizing Image Layout

To create a layout similar to the one in the screenshot, configure your images with appropriate spans:

```typescript
// First row - Wedding feature image
{
  id: "img1",
  src: weddingsGalleryImage1,
  alt: "Wedding celebration",
  width: 800,
  height: 600,
  span: { col: 2, row: 2 }, // Large feature image
  caption: "Magical wedding moments",
  category: "Wedding"
},
// Corporate event images
{
  id: "img2",
  src: corporateGalleryImage1,
  alt: "Corporate event",
  width: 600,
  height: 400,
  span: { col: 1, row: 1 }, // Standard image
  caption: "Professional corporate gathering",
  category: "Corporate"
}
```

## Integration Examples

The ImageGallerySection component is integrated in the following pages:

- **Home Page**: As a standalone section showcasing event highlights
- **Event Type Pages**: With customized props and controls hidden:

```tsx
<ImageGallerySection 
  title="Creating Unforgettable Moments"
  subtitle="Event Gallery"
  description="Experience the energy and excitement of our events through our gallery. From elegant weddings to dynamic corporate gatherings, we bring the perfect atmosphere to every celebration."
  showControls={false}
/>
```

## Accessibility

The component includes:

- Keyboard navigation for the lightbox
- Proper alt text for all images
- ARIA labels for interactive elements
- Focus management for modal dialogs
