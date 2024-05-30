/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans'],
      },
      colors: {
        'primary': '#39A78D',
        'second': '#F2F3F4',
        'third': '#E9FFDB',
        'four':'#00563B',
        'five':'rgba(0,0,0,.25)',
        'six':'#B2BEB5',
        'seven':'#E5E4E2',
      },
      keyframes: {
        wrapper: {
          '50%': { transform: 'translateY(-48px)' },
          '100%': {  transform: 'translateY(-96px)'},
        }
      },
      animation: {
        wrapper: 'wrapper 5s ease-in-out infinite alternate',
      },
      gridTemplateColumns: {
        customized: 'repeat(auto-fill , minmax(190px,200px))',
      },
    },
    clipPath: {
      mypolygon: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
    },
  },
  plugins: [
    require('tailwind-clip-path'),
  ],
}