import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  safelist: [
    "from-[#3A2B5E]", "to-[#1B1030]",
    "from-[#1F3B4D]", "to-[#0E1B24]",
    "from-[#4A2340]", "to-[#1A0E1A]",
    "from-[#2B4A3E]", "to-[#0F1E18]",
    "from-[#4A3320]", "to-[#1E140C]",
    "from-[#2A2E4A]", "to-[#101124]",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0C0B",
        panel: "#12140F",
        signal: "#C8FF3D",
        static: "#5A6355",
        line: "#2A2E24",
        alert: "#FF5A36",
        paper: "#E7E9DE",
        rank1: "#FF3D77",
        rank2: "#FF8A3D",
        rank3: "#FFC93D",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        scanlines:
          "repeating-linear-gradient(0deg, rgba(200,255,61,0.035) 0px, rgba(200,255,61,0.035) 1px, transparent 1px, transparent 3px)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.6" },
          "94%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        flicker: "flicker 6s infinite",
        scan: "scan 4s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
