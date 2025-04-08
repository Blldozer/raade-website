import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      jsxImportSource: "react",
      plugins: [],
    }),
    // Only use componentTagger in development mode
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimization settings
  build: {
    // Ensure sourcemaps aren't included in production
    sourcemap: false,
    // Minify output for production
    minify: 'terser',
    // Ensure no WebSocket HMR connections are attempted in production
    manifest: true,
    // Disable HMR explicitly in production build
    hmr: false,
    // Improve chunk loading strategy - modified for better React compatibility
    rollupOptions: {
      external: ['react-helmet'],
      output: {
        manualChunks: (id) => {
          // Ensure React and ReactDOM stay in the same chunk
          if (id.includes('node_modules/react/') || 
              id.includes('node_modules/react-dom/') || 
              id.includes('node_modules/scheduler/') ||
              id.includes('node_modules/use-sync-external-store/')) {
            return 'react-vendor';
          }
          // Keep GSAP libraries together
          if (id.includes('node_modules/gsap/')) {
            return 'gsap-vendor';
          }
          // Ensure all Radix UI components are bundled together
          if (id.includes('node_modules/@radix-ui/')) {
            return 'radix-vendor';
          }
          // Let other dependencies be chunked normally
          return undefined;
        }
      }
    }
  }
}));
