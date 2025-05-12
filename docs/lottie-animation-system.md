# Lottie Animation System

This document outlines the Lottie animation system implemented in our project to replace GIFs with more performant and flexible Lottie animations.

## Overview

Lottie is a library that renders Adobe After Effects animations exported as JSON in real-time. It offers several advantages over traditional GIF animations:

- **Smaller file sizes**: Lottie JSON files are typically 10x smaller than equivalent GIFs
- **Scalable vector graphics**: Animations look crisp at any resolution
- **Programmable animations**: Can be paused, reversed, or controlled frame-by-frame
- **Better performance**: Less CPU and memory usage, especially on mobile devices
- **Theme support**: Can be modified at runtime to support light/dark themes

## Components

### LottieAnimation

The base component for rendering Lottie animations with advanced features:

```tsx
<LottieAnimation
  animationData={animationData}
  width={200}
  height={200}
  autoplay={true}
  loop={true}
  playOnVisible={true}
  playOnHover={false}
  lowDataMode={false}
  darkMode={false}
  onComplete={() => console.log('Animation complete')}
  onTap={() => console.log('Animation tapped')}
/>
```

**Key Features:**
- Visibility-based playback (only plays when visible in viewport)
- Hover-based playback
- Theme awareness (light/dark mode)
- Data-saving mode
- Touch interaction support
- SSR compatibility

### LottieImage

A drop-in replacement for Image components that can render either Lottie animations or fallback images:

```tsx
<LottieImage
  src="/images/fallback.gif"
  lottieDataLoader={() => import('@/assets/lottie/animation.json').then(m => m.default)}
  alt="Animation description"
  width={400}
  height={400}
  className="rounded-lg"
  playOnVisible={true}
  playOnHover={false}
  lowDataMode={false}
/>
```

**Key Features:**
- Seamless fallback to static images
- SSR compatibility
- Browser compatibility detection
- Lazy loading support

### ScrollLottie

Control animation playback based on scroll position:

```tsx
<ScrollLottie
  animationData={animationData}
  scrollStart={20}
  scrollEnd={80}
  width={300}
  height={300}
/>
```

**Key Features:**
- Frame-by-frame control
- Customizable trigger points
- Smooth playback

### AnimationSequence

Chain multiple animations together:

```tsx
<AnimationSequence autoPlay={true} delay={300} onComplete={() => console.log('All animations complete')}>
  <LottieAnimation animationData={animation1} />
  <LottieAnimation animationData={animation2} />
  <LottieAnimation animationData={animation3} />
</AnimationSequence>
```

**Key Features:**
- Sequential playback
- Configurable delays
- Completion callbacks

## Hooks

### useMediaQuery

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
```

### useThemeAwareLottie

```tsx
const { animationData, isLoading } = useThemeAwareLottie({
  lightThemeData: lightAnimation,
  darkThemeData: darkAnimation,
  dataLoader: () => import('@/assets/lottie/animation.json').then(m => m.default),
  isDarkMode: true
});
```

### useDataSaving

```tsx
const { isLowDataMode, setLowDataMode, isAutomaticDataSaving, setAutomaticDataSaving } = useDataSaving();
```

## Context Providers

### DataSavingProvider

Provides data-saving mode functionality:

```tsx
<DataSavingProvider>
  <App />
</DataSavingProvider>
```

## Utilities

### LottiePerformanceMonitor

A debug component that displays performance metrics for Lottie animations:

```tsx
<LottiePerformanceMonitor />
```

## Implementation Examples

### Replacing CSS Animations with Lottie

The ViboBadge component uses Lottie for confetti animation:

```tsx
{!prefersReducedMotion && animationData && !isLoading && (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <LottieAnimation
      animationData={animationData}
      autoplay={true}
      loop={true}
      className="absolute inset-0"
      playOnVisible={true}
      playOnHover={false}
    />
  </div>
)}
```

### Replacing SVG Animations with Lottie

The HeroSection component uses Lottie for scroll indicator animation:

```tsx
<div className="flex justify-center pb-4">
  <LottieScrollIndicator />
</div>
```

### Replacing GIFs with Lottie

The Social Booth Gallery uses Lottie for animated content:

```tsx
<LottieImage
  src={boothSocialGallery1Img}
  lottieDataLoader={socialBooth1}
  alt="Social Booth Animation 1"
  width={400}
  height={400}
  className="rounded-lg w-full h-auto"
  playOnVisible={true}
  playOnHover={false}
  lowDataMode={isLowDataConnection}
/>
```

## Performance Considerations

- Animations are lazy-loaded and only play when visible
- Data-saving mode disables animations on cellular connections
- Bundle size is optimized through code splitting
- Animations respect user preferences (reduced motion, theme)

## Adding New Animations

1. Convert GIF to Lottie using LottieFiles.com or Adobe After Effects
2. Optimize the JSON file using our optimization script
3. Add the file to `src/assets/lottie/`
4. Create a loader function in `src/assets/lottie/index.ts`
5. Use the animation with appropriate components
