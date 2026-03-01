/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff5a5f',
          50: '#fff1f1',
          100: '#ffe1e2',
          200: '#ffc7c9',
          300: '#ffa0a3',
          400: '#ff6a6e',
          500: '#ff5a5f',
          600: '#ed2b31',
          700: '#c81d22',
          800: '#a51c20',
          900: '#881e21',
        },
        secondary: {
          DEFAULT: '#484848',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#484848',
          900: '#3d3d3d',
        },
        dark: {
          DEFAULT: '#1a1a2e',
          100: '#2d2d44',
          200: '#24243a',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [],
}
