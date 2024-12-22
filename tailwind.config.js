/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shakeX: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        shakeX: "shakeX 0.5s ease-in-out",
      },
      colors:{
        'midnight-blue': '#050526',
        'beige': '#F5F1E3',
      },
      fontFamily: {
        sans: ['Roboto Slab', 'serif'], // Add your Google Font here
      },
    },
  },
  plugins: [],
};
