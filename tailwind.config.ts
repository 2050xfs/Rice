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
        'brand-indigo-600': '#4F46E5',
        'brand-indigo-500': '#6366F1',
        'brand-indigo-400': '#818CF8',
        'brand-indigo-300': '#A5B4FC',
        'brand-white': '#FFFFFF',
        'brand-gray-900': '#111827', 
        'brand-gray-800': '#1F2937', 
        'brand-gray-700': 'hsl(var(--brand-gray-700))', // Approx #374151
        'brand-gray-600': '#4B5563', 
        'brand-gray-500': '#6B7280', 
        'brand-gray-400': 'hsl(var(--brand-gray-400))', // Approx #9CA3AF
        'brand-gray-300': '#D1D5DB', 
        'brand-yellow-400': '#FBBF24', 
        'brand-navy': 'hsl(var(--brand-navy))', // #0B0F17
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
        'shimmer': 'shimmer 1s linear', 
  		},
      // Typography from Project Spec
      fontSize: {
        'h1-hero': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em', fontWeight: '700' }], 
        'h1-hero-sm': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.025em', fontWeight: '700' }], 
        'h2-section': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em', fontWeight: '700' }], 
        'h2-section-sm': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.025em', fontWeight: '700' }], 
        'h3-sub': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em', fontWeight: '600' }], 
        'section-label': ['1rem', { lineHeight: '1.75rem', fontWeight: '600' }], 
        'body-lg': ['1.125rem', { lineHeight: '2rem' }], 
        'body-base': ['1rem', { lineHeight: '1.75rem' }], 
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }], 
      },
      // Spacing System from Project Spec
      spacing: {
        'section-py': '6rem', 
        'section-py-sm': '8rem', 
        'content-mt': '4rem', 
        'content-mt-sm': '5rem', 
        'content-mt-lg': '6rem', 
      }
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
} satisfies Config;
