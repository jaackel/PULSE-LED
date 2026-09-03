/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#090d16",
        foreground: "#f1f5f9",
        surface: "#0f172a",
        "surface-2": "#1e293b",
        border: "rgba(255, 255, 255, 0.08)",
        primary: {
          DEFAULT: "#2563eb",
          glow: "#60a5fa",
        },
        silver: "#94a3b8",
        "muted-foreground": "#94a3b8",
        whatsapp: "#22c55e",
        facebook: "#1877f2",
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
      },
      scale: {
        '105': '1.05',
        '107': '1.07',
      },
      aspectRatio: {
        '16/10': '16 / 10',
      }
    },
  },
  plugins: [],
}
