import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        purpleColor: "var(--purple)",
        backgroundColor: "var(--background)",
        textColor: "var(--text)",
        cardBackground: "var(--card)",
        gradientStart: "var(--gradient-start)",
        gradientEnd: "var(--gradient-end)",
        borderColor: "var(--border-color)",
        strokeColor: "var(--stroke-color)",
        shadowColor: "var(--shadow-color)",
        gradientFrom: "var(--gradient-from)",
        gradientTo: "var(--gradient-to)",
        grayText: "var(--gray-text)",
        backgroundGrey: "var(--background-grey)",
      },
      minHeight: {
        headerSize: "var(--header-height)",
        footerSize: "var(--footer-height)",
        cardSize: "calc(100vh - 200px)"
      },
      height: { 
        headerSize: "var(--header-height)",
        footerSize: "var(--footer-height)"
      },
      spacing: {
        headerSize: "calc(var(--header-height) + 2rem)",
        headerSizeMobile: "var(--header-height)",
        fullMinusHeader: "calc(100% - 200px)",
        90: '91.666667%',
        65: '65%',
        30: '30%',
        card: 'calc(100% / 4 - 1rem)',
        cardLarge: 'calc(100% / 3 - 1rem)',
        cardMobile: 'calc(100% / 2 - 0.5rem)',
      },
      maxWidth: {
        "screen-image": "1440px",
      },
      borderColor:{
        purpleColor: "var(--purple)"
      }
    },
  },
  plugins: [],
};

export default config;
