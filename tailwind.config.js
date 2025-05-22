/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  safelist: [
    'text-text-light',        
    'dark:text-text-dark',    
    'font-sans',              
    'bg-white',
    'dark:bg-gray-800',
    // The following are more for ensuring specific shades are recognized if needed,
    // though direct class usage (like text-text-light) is what's usually purged.
    { pattern: /text-slate-700/ }, 
    { pattern: /text-slate-200/ },
    // Safelisting gradient classes used in buttons, just in case:
    'bg-gradient-to-r',
    'from-blue-600',
    'via-purple-600',
    'to-blue-600',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1', // Indigo
          dark: '#818cf8',  // Lighter indigo for dark mode
        },
        secondary: {
          light: '#10b981', // Emerald
          dark: '#34d399',  // Lighter emerald for dark mode
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a',  // Slate-900
        },
        surface: {
          light: '#f8fafc',  // Slate-50
          dark: '#1e293b',   // Slate-800
        },
        text: {
          light: '#334155',  // Slate-700
          dark: '#e2e8f0',   // Slate-200
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
} 