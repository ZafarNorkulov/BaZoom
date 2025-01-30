/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: {
        DEFAULT: "transparent",
      },
      black: {
        DEFAULT: "#000",
      },
      white: {
        DEFAULT: "#FFF",
      },
      background: {
        DEFAULT: "#1E1E1E",
      },
      gray: {
        DEFAULT: "#939393",
      },
      darkgray: {
        DEFAULT: "#444444",
      },
      deepgray: {
        DEFAULT: "#2A2A2A",
      },
      dimgray: {
        DEFAULT: "#363636",
      },
      cyan: {
        DEFAULT: "#33D2FF",
      },
      deepblue: {
        DEFAULT: "#3D68DE",
      },
      purple: {
        DEFAULT: "#9845E8",
      },
      red: {
        DEFAULT: "#FE3B30",
      },
      green: {
        DEFAULT: "#32D058",
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      screens: {
        "mobile-s": { max: "360px" },
        short: { raw: "(max-height: 770px)" },
        pc: { raw: "(max-height: 600px)" },
      },
    },
  },
  plugins: [],
};
