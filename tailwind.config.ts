import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "Inter", "sans-serif"],
        display: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f5f7ff",
          100: "#ebf0fe",
          200: "#dae3ff",
          300: "#bfccff",
          400: "#99a9ff",
          500: "#707bff",
          600: "#4f46e5", // Primary Indigo
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        slate: {
          950: "#0f172a",
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
