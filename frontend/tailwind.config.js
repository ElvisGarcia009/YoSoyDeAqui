/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:  '#edebe4',
        dark:   '#332e31',
        teal:   '#7ec0c4',
        coral:  '#ef3a42',
        yellow: '#ffc959',
        pink:   '#fac7cb',
      },
      fontFamily: {
        heading: ['"Cimo Ones"', 'sans-serif'],
        body:    ['Grenadine', 'serif'],
      },
    },
  },
  plugins: [],
};
