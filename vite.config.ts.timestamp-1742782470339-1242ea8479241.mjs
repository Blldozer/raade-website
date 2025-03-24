// vite.config.ts
import { defineConfig } from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\ifeol\\OneDrive\\Documents\\RAADE Website\\raade-website";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    // Only use componentTagger in development mode
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  // Production optimization settings
  build: {
    // Ensure sourcemaps aren't included in production
    sourcemap: false,
    // Minify output for production
    minify: "terser",
    // Ensure no WebSocket HMR connections are attempted in production
    manifest: true,
    // Disable HMR explicitly in production build
    hmr: false,
    // Improve chunk loading strategy
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          gsap: ["gsap", "gsap/ScrollTrigger", "gsap/ScrollToPlugin"]
        }
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZmVvbFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUkFBREUgV2Vic2l0ZVxcXFxyYWFkZS13ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZmVvbFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUkFBREUgV2Vic2l0ZVxcXFxyYWFkZS13ZWJzaXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9pZmVvbC9PbmVEcml2ZS9Eb2N1bWVudHMvUkFBREUlMjBXZWJzaXRlL3JhYWRlLXdlYnNpdGUvdml0ZS5jb25maWcudHNcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCI6OlwiLFxyXG4gICAgcG9ydDogODA4MCxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KCksXHJcbiAgICAvLyBPbmx5IHVzZSBjb21wb25lbnRUYWdnZXIgaW4gZGV2ZWxvcG1lbnQgbW9kZVxyXG4gICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJlxyXG4gICAgY29tcG9uZW50VGFnZ2VyKCksXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gUHJvZHVjdGlvbiBvcHRpbWl6YXRpb24gc2V0dGluZ3NcclxuICBidWlsZDoge1xyXG4gICAgLy8gRW5zdXJlIHNvdXJjZW1hcHMgYXJlbid0IGluY2x1ZGVkIGluIHByb2R1Y3Rpb25cclxuICAgIHNvdXJjZW1hcDogZmFsc2UsXHJcbiAgICAvLyBNaW5pZnkgb3V0cHV0IGZvciBwcm9kdWN0aW9uXHJcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgLy8gRW5zdXJlIG5vIFdlYlNvY2tldCBITVIgY29ubmVjdGlvbnMgYXJlIGF0dGVtcHRlZCBpbiBwcm9kdWN0aW9uXHJcbiAgICBtYW5pZmVzdDogdHJ1ZSxcclxuICAgIC8vIERpc2FibGUgSE1SIGV4cGxpY2l0bHkgaW4gcHJvZHVjdGlvbiBidWlsZFxyXG4gICAgaG1yOiBmYWxzZSxcclxuICAgIC8vIEltcHJvdmUgY2h1bmsgbG9hZGluZyBzdHJhdGVneVxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIHJlYWN0OiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxyXG4gICAgICAgICAgZ3NhcDogWydnc2FwJywgJ2dzYXAvU2Nyb2xsVHJpZ2dlcicsICdnc2FwL1Njcm9sbFRvUGx1Z2luJ10sXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSmhDLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQTtBQUFBLElBRU4sU0FBUyxpQkFDVCxnQkFBZ0I7QUFBQSxFQUNsQixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsT0FBTztBQUFBO0FBQUEsSUFFTCxXQUFXO0FBQUE7QUFBQSxJQUVYLFFBQVE7QUFBQTtBQUFBLElBRVIsVUFBVTtBQUFBO0FBQUEsSUFFVixLQUFLO0FBQUE7QUFBQSxJQUVMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLE9BQU8sQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM1QixNQUFNLENBQUMsUUFBUSxzQkFBc0IscUJBQXFCO0FBQUEsUUFDNUQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
