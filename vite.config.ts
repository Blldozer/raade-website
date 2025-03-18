
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
      // Use pure React production mode by default with development mode only in dev environment
      jsxRuntime: mode === 'development' ? 'automatic' : 'classic',
      // Use production mode react by default
      devTarget: mode === 'development' ? 'es2020' : undefined,
      // Disable React Refresh in production
      fastRefresh: mode === 'development'
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize build settings
  build: {
    // Use production mode
    minify: true,
    // Disallow large chunks
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // Separate vendor chunks
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': [
            '@radix-ui/react-accordion', 
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-slot',
            '@radix-ui/react-toast',
            'class-variance-authority',
            'clsx',
            'tailwind-merge'
          ],
          'animations': ['gsap', 'framer-motion'],
          'data': ['@tanstack/react-query', '@supabase/supabase-js']
        }
      }
    }
  }
}));
