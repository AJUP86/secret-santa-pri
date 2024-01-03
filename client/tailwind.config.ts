/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        accent: '#2563eb', // example color for your accent
        'accent-hover': '#1d4ed8', // example color for your accent hover
        // Your custom colors
        primary: '#2563eb', // Blue 600
        'primary-hover': '#1d4ed8', // Blue 700
        secondary: '#eab308', // Yellow 500
        'secondary-hover': '#ca8a04', // Yellow 600
        'text-primary': '#ffffff', // White
        'text-secondary': '#d1d5db', // Gray 300
        footer: '#1f2937', // Gray 800
        background: '#111827', // Gray 900
      },
    },
  },
  plugins: [],
};
