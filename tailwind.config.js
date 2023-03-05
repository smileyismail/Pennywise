/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F8EEFF",
        secondary: "#C0A4FB",
        action: "#893AE4",
        blackDark: "#101010",
        blackMedium: "#202020",
        blackLight: "#303030",
      },
      fontFamily: {
        archivo: ["Archivo Black"],
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
