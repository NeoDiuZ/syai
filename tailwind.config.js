/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: false,
  safelist: [
    'text-text-light',
    'font-sans',
    'bg-white',
    // The following are more for ensuring specific shades are recognized if needed,
    // though direct class usage (like text-text-light) is what's usually purged.
    { pattern: /text-slate-700/ },
    { pattern: /text-slate-200/ },
    // Safelisting gradient classes used in buttons, just in case:
    'bg-gradient-to-r',
    'from-blue-600',
    'via-blue-600',
    'to-blue-600',
    // New gradient animation classes
    'animated-gradient-bg',
    'animated-gradient-subtle',
    'animated-gradient-website',
    'animated-gradient-premium',
    'animated-gradient-aurora',
    'animated-gradient-aurora-vibrant',
    'animated-gradient-aurora-sides',
    'animated-gradient-text',
    'animated-gradient-button',
    'animated-gradient-slow',
    'animated-gradient-fast',
    'glass-card',
    'glass-card-strong',
    'glass-card-subtle',
    'glass-hover',
    'glass-content',
    'marquee-content-ltr',
    'marquee-content-rtl',
    'bg-600%',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1', // Indigo
        },
        secondary: {
          light: '#10b981', // Emerald
        },
        background: {
          light: '#ffffff',
        },
        surface: {
          light: '#f8fafc',  // Slate-50
        },
        text: {
          light: '#334155',  // Slate-700
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'gradient-foreground': 'gradient-foreground 8s linear infinite',
        'subtle-pulse': 'subtle-pulse 2s infinite ease-in-out',
        'gradient-x': 'gradient-x 5s ease infinite',
        'moving-gradient': 'movingGradient 20s ease infinite',
      },
      keyframes: {
        'gradient-foreground': {
          '0%, 100%': { 'background-size': '200% 200%', backgroundPosition: 'left center' },
          '50%': { 'background-size': '200% 200%', backgroundPosition: 'right center' },
        },
        'subtle-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        movingGradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200%',
        '600%': '600%',
      },
    },
  },
  plugins: [],
}
