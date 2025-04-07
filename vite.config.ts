
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [
    react()
  ],
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
      interval: 100,
    },
    allowedHosts: [
      'a6ffbe3b-6a03-493f-92bd-706dd74e0403.lovableproject.com'
    ]
  },
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
    sourcemap: mode === "development",
    minify: mode === "production",
    rollupOptions: {
      output: {
        manualChunks: function(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer-motion';
            }
            if (id.includes('@radix-ui') || id.includes('lucide')) {
              return 'vendor-ui';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'framer-motion',
      'lucide-react',
      'lovable-tagger'
    ],
    exclude: [
      '@contentsquare/tag-sdk'
    ]
  }
}))
