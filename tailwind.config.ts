import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        'xs': '375px',    // Small phones
        'sm': '640px',    // Large phones
        'md': '768px',   // Tablets
        'lg': '1024px',   // Laptops
        'xl': '1280px',   // Desktop
        '2xl': '1400px',  // Large Desktop
        '3xl': '1920px'   // Extra Large Screens
      },
    },
    extend: {
      fontFamily: {
        amadine: ["Amadine", "sans-serif"],
        hammersmith: ["Hammersmith One", "serif"],
        opensans: ["Open Sans", "serif"],
        zillaslab: ["Zilla Slab", "serif"],
        zillahighlight: ["Zilla Slab Highlight", "serif"],
        merriweather: ["Merriweather Sans", "serif"],
        taviraj: ["Taviraj", "serif"],
        alegreyasans: ["Alegreya Sans", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        lora: ["Lora", "serif"],
        simula: ["Simula Book", "serif"],
        "simula-italic": ["Simula BookItalic", "serif"],
      },
      colors: {
        raade: {
          navy: "#274675",
          red: "#F73B20",
          orange: "#FFA726",
          "Athens gray": "#F4F5F4",
          "Oslo gray": "#3C403A",
          "Thunder": "#2B212E",
          "yellow-orange": "#FBB03B",
          gold: {
            start: "#FFA726",
            middle: "#FF9848",
            end: "#FF8A6A",
          },
        },
        cream: "#F5F5F0", // Added cream color for placeholder boxes
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        'screen-w': '100vw',
        'screen-h': '100vh',
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
