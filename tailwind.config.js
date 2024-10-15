/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#004fff",

          secondary: "#4900ff",

          accent: "#00a3ff",

          neutral: "#1d1422",

          "base-100": "#f6fefa",

          info: "#00fbff",

          success: "#08874CFF",

          warning: "#ff8700",

          error: "#D60000FF",
        },
      },
    ],
    extend: {
      scrollbar: ["hidden"],
    },
  },
};
