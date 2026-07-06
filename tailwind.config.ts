import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#08080a",
          900: "#0b0b0e",
          850: "#101015",
          800: "#15151b",
          700: "#1d1d25",
          600: "#292933",
        },
        accent: {
          red: "#ff3b30",
          orange: "#ff9500",
          blue: "#0a84ff",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.05), 0 8px 40px -12px rgba(10,132,255,0.35)",
        "glow-red": "0 0 0 1px rgba(255,255,255,0.05), 0 8px 40px -12px rgba(255,59,48,0.4)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(10,132,255,0.12), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
