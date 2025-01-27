/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      // Custom colors
      colors: {
        primary: "#FF3D00", // brand - tanglerine
        secondary: "#4CAF50", // brand
        tertiary: "", // brand
        primary_txt: "#ff6347", // text
        secondary_txt: "#4CAF50", // text
        tertiary_txt: "", // text
        primary_bg: "#100F0F", // onyx
        secondary_bg: "#4CAF50", // background
        tertiary_bg: "", // background
        accent_1: "#A29F9F", // chrome
        accent_2: "#FFEFCC", // almond pearl
        success: "#f8f8f8",
        warning: "#333",
        error: "#f8f8f8",
        info: "#333",
      },

      // Custom breakpoints
      screens: {
        xs: "480px", // Extra small screens breakpoint (custom)
        "3xl": "1600px", // Custom extra-large breakpoint
      },
    },
  },
  plugins: [],
};
