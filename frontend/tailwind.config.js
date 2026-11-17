import colors from "tailwindcss/colors";

/*
 * DevAria dark theme: graphite surfaces with a green primary and a teal accent.
 *
 * The components use semantic-ish class names (ink-* surfaces, indigo-* primary, violet/fuchsia/sky secondary,
 * text-white headings, border-white/[0.06] hairlines). This file maps those names to the DevAria palette,
 * so the page code keeps the same logic as the original dashboard and only the look changes.
 * `snow` is real white for text on coloured fills; `navy` is the brand heading colour.
 */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "IBM Plex Sans", "ui-sans-serif", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        snow: "#ffffff",
        navy: "#f4f7f5",
        ink: { 950: "#0a0d0c", 900: "#111614", 850: "#141a18", 800: "#1a211f", 700: "#25302c", 600: "#34423d" },
        slate: colors.zinc,
        indigo: colors.emerald,
        violet: colors.teal,
        fuchsia: colors.teal,
        sky: colors.cyan,
        cyan: colors.teal,
      },
      backgroundImage: {
        brand: "linear-gradient(135deg, #059669 0%, #10b981 50%, #2dd4bf 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(16,185,129,.35), 0 10px 30px -12px rgba(16,185,129,.55)",
        card: "0 1px 0 rgba(255,255,255,.03) inset, 0 12px 32px -20px rgba(0,0,0,.8)",
      },
      keyframes: { pulseDot: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.35 } } },
      animation: { pulseDot: "pulseDot 1.4s ease-in-out infinite" },
    },
  },
  plugins: [],
};
