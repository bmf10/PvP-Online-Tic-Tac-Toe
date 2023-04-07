const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-roboto)", ...fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}
