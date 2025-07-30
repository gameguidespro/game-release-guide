/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neonGreen: '#39ff14',
      },
      fontFamily: {
        orbitron: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}