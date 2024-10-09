/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        chattheme: {
          primary: "#0056ff",

          secondary: "#00cd9c",

          accent: "#00bcff",

          neutral: "#121510",

          "base-100": "#ffffe3",

          info: "#00addd",

          success: "#00a04f",

          warning: "#ff9d00",

          error: "#ff89a6",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
