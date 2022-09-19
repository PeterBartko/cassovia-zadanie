/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        pnl: '0px -16px 40px rgba(0, 0, 0, 0.2)',
        day: '0px 8px 24px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        xs: '350px',
      },
    },
  },
  plugins: [],
}
