/** @type {import('tailwindcss').Config} */


const tomato = {
  400: "#cb6767",
  500: "#c15c5c",
  600: "#c95555",
  700: "#b14f4f"
}
export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mPlus: ["M PLUS Rounded 1c", "sans-serif"],
        nunito: ["Nunito Sans", "serif"]
      },
      colors: { tomato: { ...tomato } }
    },
  },
  plugins: [],
}

