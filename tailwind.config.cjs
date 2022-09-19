/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        pnl: '0px -16px 40px rgba(0, 0, 0, 0.2)',
      },
      screens: {
        xs: '350px',
      },
    },
  },
  plugins: [],
}
