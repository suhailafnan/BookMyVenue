import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        linen: "#F7F3EE",
        white: "#FFFFFF",
        parchment: "#FDFAF6",
        brick: "#C8481A",
        amber: "#B8691A",
        antique: "#A07020",
        ochre: "#8A5C10",
        espresso: "#1E120A",
        walnut: "#5A3E28",
        mocha: "#7A6050",
        taupe: "#B09878",
        driftwood: "#C8B49A",
        navy: "#1C2860",
        slate: "#3A5088",
      },
    },
  },
  plugins: [],
};

export default config;
