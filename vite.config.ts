import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add more robust error handling for dependency resolution
    hmr: {
      overlay: true,
    },
    // Ensure watch options are properly set for file system events
    watch: {
      usePolling: false,
      interval: 100,
    },
  },
  // Clear the cache on start
  cacheDir: '.vite',
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
      '@': path.resolve(__dirname, 'src'),
    },
    dedupe: ['react', 'react-dom'],
    preserveSymlinks: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      // Ensure external dependencies are properly handled
      external: [],
      output: {
        manualChunks: function manualChunks(id) {
          if (id.includes('node_modules')) {
            // Create a chunk for React
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            
            // Create a chunk for Framer Motion
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            
            // Create a chunk for UI components
            if (id.includes('@radix-ui') || id.includes('lucide')) {
              return 'vendor-ui';
            }
            
            // Default vendor chunk
            return 'vendor';
          }
        }
      }
    }
  },
  // Add optimizeDeps to improve dependency optimization
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
    include: [
      'react', 
      'react-dom', 
      'framer-motion', 
      '@radix-ui/react-dialog', 
      'lucide-react',
      'react-router-dom'
    ],
    exclude: []
  }
}));
