
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add verbose headers for debugging image loading issues
    headers: {
      'Cache-Control': 'no-store',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*',
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
    // Ensure no WebSocket HMR connections are attempted in production
    manifest: true,
    // Disable HMR explicitly in production build
    hmr: false,
    // Improve chunk loading strategy
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/ScrollToPlugin'],
        }
      }
    }
  }
}));
