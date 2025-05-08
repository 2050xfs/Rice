import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
  		colors: {
        // ShadCN Styles (using HSL variables from globals.css)
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: { // Indigo-600
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: { // Indigo-500
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: { // Indigo-300
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
        // Custom Project Colors (Direct Hex for Tailwind classes if needed, but prefer HSL via globals.css)
        'indigo-600': '#4F46E5',
        'indigo-500': '#6366F1',
        'indigo-400': '#818CF8',
        'indigo-300': '#A5B4FC',
        'brand-white': '#FFFFFF',
        'gray-900': '#111827', // Primary text on light, BG for dark sections
        'gray-800': '#1F2937', // Secondary text, BG for testimonials
        'gray-600': '#4B5563', // Body text
        'gray-500': '#6B7280', // For small text, captions
        'gray-300': '#D1D5DB', // Subdued text on dark BG
        'yellow-400': '#FBBF24', // Star ratings
  		},
  		borderRadius: {
  			lg: 'var(--radius)', // Typically 0.5rem
  			md: 'calc(var(--radius) - 2px)', // Typically 0.375rem
  			sm: 'calc(var(--radius) - 4px)' // Typically 0.25rem
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'shimmer': 'shimmer 1s linear', // Duration can be adjusted
  		},
      // Typography from Project Spec (can be used as utility classes or within components)
      fontSize: {
        'h1-hero': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em', fontWeight: '700' }], // text-4xl
        'h1-hero-sm': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }], // sm:text-6xl
        'h2-section': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em', fontWeight: '700' }], // text-3xl
        'h2-section-sm': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em', fontWeight: '700' }], // sm:text-4xl
        'h3-sub': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em', fontWeight: '600' }], // text-2xl
        'section-label': ['1rem', { lineHeight: '1.75rem', fontWeight: '600' }], // text-base
        'body-lg': ['1.125rem', { lineHeight: '2rem' }], // text-lg
        'body-base': ['1rem', { lineHeight: '1.75rem' }], // text-base
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }], // text-sm
      },
      // Spacing System from Project Spec
      spacing: {
        'section-py': '6rem', // py-24
        'section-py-sm': '8rem', // sm:py-32
        'content-mt': '4rem', // mt-16
        'content-mt-sm': '5rem', // sm:mt-20
        'content-mt-lg': '6rem', // lg:mt-24
      }
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Config;
