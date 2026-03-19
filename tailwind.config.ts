/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        bg: '#080808',
        surface: '#0e0e0e',
        chrome: '#0a0a0a',
      },
    },
  },
  plugins: [],
}
