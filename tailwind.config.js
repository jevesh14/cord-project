/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['General Sans', 'system-ui', 'sans-serif'],
        'serif': ['IBM Plex Serif', 'Georgia', 'serif'],
      },
      colors: {
        navy: '#00053F',
        ivory: '#F9F9F6',
        coral: '#FF6B6B',
        teal: '#A7F3D0',
        lavender: '#C7D2FE',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  safelist: [
    'bg-coral/10',
    'bg-teal/10',
    'bg-lavender/10',
    'text-coral',
    'text-teal',
    'text-lavender',
    'bg-coral',
    'bg-teal',
    'bg-navy',
    'bg-lavender'
  ],
  plugins: [],
};