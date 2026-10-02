import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "gold-crayola": "hsl(38, 61%, 73%)",
        "smoky-1": "hsla(40, 12%, 5%, 1)",
        "smoky-2": "hsla(30, 8%, 5%, 1)",
        "smoky-3": "hsla(0, 3%, 7%, 1)",
        "eerie-1": "hsla(210, 4%, 9%, 1)",
        "eerie-2": "hsla(210, 4%, 11%, 1)",
        "eerie-3": "hsla(180, 2%, 8%, 1)",
        "eerie-4": "hsla(0, 0%, 13%, 1)",
        quicksilver: "hsla(0, 0%, 65%, 1)",
        davysgrey: "hsla(30, 3%, 34%, 1)",
      },
      fontFamily: {
        forum: ["var(--font-forum)", "serif"],
        dmsans: ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "spin-slow": "rotate360 15s linear infinite",
      },
      keyframes: {
        rotate360: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;