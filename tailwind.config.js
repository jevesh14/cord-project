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
        background: {
          main: '#FFF6F9',    // soft blush pink
          alt: '#FCE4EC',     // light rose pink
          card: '#FDF2F6',    // transparent overlay background
        },
        plum: {
          light: '#8E3C68',   // header/footer plum-purple
          DEFAULT: '#6A1B4D', // bold plum for headings
        },
        pink: {
          vivid: '#D81B60',   // subheadings/highlights
          primary: '#EC407A', // primary button background
          hover: '#C2185B',   // primary button hover
          soft: '#F8BBD0',    // secondary button background
        },
        text: {
          body: '#4A4A4A',    // neutral dark grey
          light: '#FFFFFF',   // white text
        }
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
    'bg-background-main',
    'bg-background-alt',
    'bg-background-card',
    'bg-plum',
    'bg-plum-light',
    'bg-pink-vivid',
    'bg-pink-primary',
    'bg-pink-hover',
    'bg-pink-soft',
    'text-plum',
    'text-pink-vivid',
    'text-text-body',
    'text-text-light',
    'hover:bg-pink-hover',
    'hover:text-pink-primary',
    'hover:underline'
  ],
  plugins: [],
};