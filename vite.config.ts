import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import commonjs from '@rollup/plugin-commonjs';

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
    // Standard React SWC plugin without custom JSX options
    react(),
    // Add commonjs plugin with stricter options to prevent TDZ errors
    commonjs({
      transformMixedEsModules: true,
      strictRequires: true
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Add explicit alias for react/jsx-runtime to help with resolution
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime')
    },
    dedupe: ['react', 'react-dom'],
    preserveSymlinks: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Improve transpilation to handle temporal dead zone errors
    target: 'es2018',
    commonjsOptions: {
      transformMixedEsModules: true,
      // Prevent hoisting which can cause TDZ errors
      strictRequires: true,
    },
    rollupOptions: {
      // Ensure external dependencies are properly handled
      external: [],
      output: {
        // Improve code splitting to avoid circular dependencies
        experimentalMinChunkSize: 10000,
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
