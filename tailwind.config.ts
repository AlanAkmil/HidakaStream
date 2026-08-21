import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  safelist: [
    "from-[#2B2140]", "to-[#120E1C]",
    "from-[#153043]", "to-[#0B1620]",
    "from-[#3A1F30]", "to-[#180D14]",
    "from-[#1B3A2E]", "to-[#0C1811]",
    "from-[#3A2A15]", "to-[#1A130A]",
    "from-[#1F2440]", "to-[#0D0F1C]",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F0D13",
        tape: "#1A1620",
        tapeLine: "#332C40",
        phosphor: "#8CFFC2",
        signalBlue: "#4FA8FF",
        staticRed: "#FF5C5C",
        tapeAmber: "#FFC15C",
        paper: "#EDEAE3",
        fog: "#8A8397",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        bars: "linear-gradient(90deg, #C0C0C0 0%, #C0C0C0 14.28%, #FFC15C 14.28%, #FFC15C 28.56%, #8CFFC2 28.56%, #8CFFC2 42.84%, #4FA8FF 42.84%, #4FA8FF 57.12%, #C77DFF 57.12%, #C77DFF 71.4%, #FF5C5C 71.4%, #FF5C5C 85.68%, #EDEAE3 85.68%, #EDEAE3 100%)",
        scan: "repeating-linear-gradient(0deg, rgba(140,255,194,0.05) 0px, rgba(140,255,194,0.05) 1px, transparent 1px, transparent 3px)",
        noise: "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06), transparent 45%)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.55" },
          "94%": { opacity: "1" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        tuneIn: {
          "0%": { opacity: "0.3", filter: "blur(2px)" },
          "60%": { opacity: "1", filter: "blur(0.5px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        staticPulse: {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 0px rgba(140,255,194,0)" },
          "50%": { boxShadow: "0 0 18px rgba(140,255,194,0.25)" },
        },
      },
      animation: {
        flicker: "flicker 7s infinite",
        riseIn: "riseIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
        tuneIn: "tuneIn 0.6s ease-out both",
        staticPulse: "staticPulse 3s ease infinite",
        glow: "glow 3.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
