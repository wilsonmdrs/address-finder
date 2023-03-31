/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      green:"#00B37E",
      blue:"#81D8F7",
      black:"#000000",
      white:"#FFFFFF",
      gray:{
        border:"#E1E1E6",
        text:"#8D8D99"
      }
    }
  },
  plugins: [],
}

