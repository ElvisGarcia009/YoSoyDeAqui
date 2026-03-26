/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:  '#f0ebe3',
        dark:   '#2d2d2d',
        teal:   '#4ecdc4',
        coral:  '#e63946',
        yellow: '#ffd60a',
        pink:   '#ff6b9d',
      },
      fontFamily: {
        heading: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
