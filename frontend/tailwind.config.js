/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text: 'hsl(var(--text) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        secondary: 'hsl(var(--secondary) / <alpha-value>)',
        accent: 'hsl(var(--accent) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
      },

      // colors: {
      //   accent: {
      //     1: 'hsl(var(--color-accent1) / <alpha-value>)',
      //     2: 'hsl(var(--color-accent2) / <alpha-value>)',
      //   },
      //   bkg: 'hsl(var(--color-bkg) / <alpha-value>)',
      //   content: 'hsl(var(--color-content) / <alpha-value>)',
      // },
      animation: {
        'spin-slower': 'spin 35s ease infinite',
        'spin-reverse': 'spin 25s ease-in-out infinite reverse',
      },
    },
  },
  plugins: [],
};
