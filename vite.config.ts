import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import glsl from 'vite-plugin-glsl';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    glsl(),
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "three": path.resolve(__dirname, "./node_modules/three")
    },
  },
  optimizeDeps: {
    include: ['three', 'react', 'react-dom']
  },
  build: {
    commonjsOptions: {
      include: [/three/, /node_modules/]
    },
    target: 'esnext'
  }
}));