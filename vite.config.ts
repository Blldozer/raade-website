
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Simplified headers for better image loading
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    }
  },
  plugins: [
    react(),
    // Only use componentTagger in development mode
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Production optimization settings
  build: {
    // Ensure sourcemaps aren't included in production
    sourcemap: false,
    // Minify output for production
    minify: 'terser',
    // Disable HMR in production
    hmr: false
  },
  // Improve asset handling
  assetsInclude: ['**/*.jpg', '**/*.webp', '**/*.png'],
}));
