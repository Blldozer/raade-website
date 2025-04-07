import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react()
  ],
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'lucide-react': path.resolve(__dirname, 'node_modules/lucide-react'),
      'lovable-tagger': path.resolve(__dirname, 'node_modules/lovable-tagger')
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    outDir: "dist",
    // Enable source maps for debugging
    sourcemap: mode === "development",
    // Enable minification for production
    minify: mode === "production",
    // Split chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: function(id) {
          if (id.includes('node_modules')) {
            // Create a chunk for React and ReactDOM
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // Create a chunk for UI libraries
            if (id.includes('@radix-ui') || 
                id.includes('framer-motion') || 
                id.includes('lucide-react')) {
              return 'ui-vendor';
            }
            // All other dependencies
            return 'vendor';
          }
        }
      }
    }
  },
  // Add optimizeDeps to improve dependency optimization
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'framer-motion',
      'lucide-react',
      'lovable-tagger'
    ],
    exclude: [
      // Exclude problematic packages
      '@contentsquare/tag-sdk'
    ]
  }
}))
