module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: "#121212",
        card: {
          DEFAULT: "#262626",
          lighter: "#282828",
          light: "#2a2a2a",
          dark: "#1b1b1b",
        },
        title: "#ffffffcb",
        accent: "#2196f3",
        input: "#404040",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
