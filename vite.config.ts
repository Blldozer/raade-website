import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ['decorators-legacy', 'classProperties']
        }
      }
    })
  ],
  server: {
    host: true,
    port: 3000,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
      interval: 100,
    },
    allowedHosts: [
      'a6ffbe3b-6a03-493f-92bd-706dd74e0403.lovableproject.com',
      '2a5eb0cf-41d8-4c91-9d88-664725fbd180-00-383l0rqa7gpnc.picard.replit.dev'
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
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          'react-router': ['react-router-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom',
      'framer-motion',
      'lucide-react'
    ],
    exclude: [
      '@contentsquare/tag-sdk',
      'lovable-tagger'
    ]
  }
})
