/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cairo: "'Cairo', sans-serif",
      },
      colors: {
        primary: {
          green: "#006A52",
          yellow: "#CC8A00",
          gray: "#D0D3DA",
        },
        secondary: {
          gold: "#B47E00",
          red: {
            light: "#B7312C",
            DEFAULT: "#8D3F2B",
          },
          gray: "#919388",
          yellow: "#F6BE00",
          sky: "#0093B2",
          blue: "#004B87",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms", "@tailwindcss/line-clamp")],
};
