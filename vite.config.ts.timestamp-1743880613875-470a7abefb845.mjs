// vite.config.ts
import { defineConfig } from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\ifeol\\OneDrive\\Documents\\RAADE Website\\raade-website";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add more robust error handling for dependency resolution
    hmr: {
      overlay: true
    },
    // Ensure watch options are properly set for file system events
    watch: {
      usePolling: false,
      interval: 100
    }
  },
  // Clear the cache on start
  cacheDir: ".vite",
  plugins: [
    react({
      jsxImportSource: "react",
      plugins: []
    }),
    // Only use componentTagger in development mode
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    },
    // Improve module resolution with preserveSymlinks
    preserveSymlinks: false
  },
  // Optimization settings
  build: {
    // Ensure sourcemaps aren't included in production
    sourcemap: false,
    // Minify output for production
    minify: "terser",
    // Ensure no WebSocket HMR connections are attempted in production
    manifest: true,
    // Disable HMR explicitly in production build
    hmr: false,
    // Improve chunk loading strategy - modified for better React compatibility
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/scheduler/") || id.includes("node_modules/use-sync-external-store/")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/gsap/")) {
            return "gsap-vendor";
          }
          if (id.includes("node_modules/@radix-ui/")) {
            return "radix-vendor";
          }
          return void 0;
        }
      }
    }
  },
  // Add optimizeDeps to improve dependency optimization
  optimizeDeps: {
    // Force inclusion of React and related packages
    include: ["react", "react-dom", "react-router-dom"],
    // Ensure proper dependency discovery
    esbuildOptions: {
      define: {
        global: "globalThis"
      }
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZmVvbFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUkFBREUgV2Vic2l0ZVxcXFxyYWFkZS13ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZmVvbFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUkFBREUgV2Vic2l0ZVxcXFxyYWFkZS13ZWJzaXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9pZmVvbC9PbmVEcml2ZS9Eb2N1bWVudHMvUkFBREUlMjBXZWJzaXRlL3JhYWRlLXdlYnNpdGUvdml0ZS5jb25maWcudHNcIjtcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCI6OlwiLFxyXG4gICAgcG9ydDogODA4MCxcclxuICAgIC8vIEFkZCBtb3JlIHJvYnVzdCBlcnJvciBoYW5kbGluZyBmb3IgZGVwZW5kZW5jeSByZXNvbHV0aW9uXHJcbiAgICBobXI6IHtcclxuICAgICAgb3ZlcmxheTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgICAvLyBFbnN1cmUgd2F0Y2ggb3B0aW9ucyBhcmUgcHJvcGVybHkgc2V0IGZvciBmaWxlIHN5c3RlbSBldmVudHNcclxuICAgIHdhdGNoOiB7XHJcbiAgICAgIHVzZVBvbGxpbmc6IGZhbHNlLFxyXG4gICAgICBpbnRlcnZhbDogMTAwLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIC8vIENsZWFyIHRoZSBjYWNoZSBvbiBzdGFydFxyXG4gIGNhY2hlRGlyOiAnLnZpdGUnLFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJlYWN0KHtcclxuICAgICAganN4SW1wb3J0U291cmNlOiBcInJlYWN0XCIsXHJcbiAgICAgIHBsdWdpbnM6IFtdLFxyXG4gICAgfSksXHJcbiAgICAvLyBPbmx5IHVzZSBjb21wb25lbnRUYWdnZXIgaW4gZGV2ZWxvcG1lbnQgbW9kZVxyXG4gICAgbW9kZSA9PT0gJ2RldmVsb3BtZW50JyAmJlxyXG4gICAgY29tcG9uZW50VGFnZ2VyKCksXHJcbiAgXS5maWx0ZXIoQm9vbGVhbiksXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gICAgLy8gSW1wcm92ZSBtb2R1bGUgcmVzb2x1dGlvbiB3aXRoIHByZXNlcnZlU3ltbGlua3NcclxuICAgIHByZXNlcnZlU3ltbGlua3M6IGZhbHNlLFxyXG4gIH0sXHJcbiAgLy8gT3B0aW1pemF0aW9uIHNldHRpbmdzXHJcbiAgYnVpbGQ6IHtcclxuICAgIC8vIEVuc3VyZSBzb3VyY2VtYXBzIGFyZW4ndCBpbmNsdWRlZCBpbiBwcm9kdWN0aW9uXHJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gICAgLy8gTWluaWZ5IG91dHB1dCBmb3IgcHJvZHVjdGlvblxyXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcclxuICAgIC8vIEVuc3VyZSBubyBXZWJTb2NrZXQgSE1SIGNvbm5lY3Rpb25zIGFyZSBhdHRlbXB0ZWQgaW4gcHJvZHVjdGlvblxyXG4gICAgbWFuaWZlc3Q6IHRydWUsXHJcbiAgICAvLyBEaXNhYmxlIEhNUiBleHBsaWNpdGx5IGluIHByb2R1Y3Rpb24gYnVpbGRcclxuICAgIGhtcjogZmFsc2UsXHJcbiAgICAvLyBJbXByb3ZlIGNodW5rIGxvYWRpbmcgc3RyYXRlZ3kgLSBtb2RpZmllZCBmb3IgYmV0dGVyIFJlYWN0IGNvbXBhdGliaWxpdHlcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcclxuICAgICAgICAgIC8vIEVuc3VyZSBSZWFjdCBhbmQgUmVhY3RET00gc3RheSBpbiB0aGUgc2FtZSBjaHVua1xyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QvJykgfHwgXHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9yZWFjdC1kb20vJykgfHwgXHJcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcy9zY2hlZHVsZXIvJykgfHxcclxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3VzZS1zeW5jLWV4dGVybmFsLXN0b3JlLycpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAncmVhY3QtdmVuZG9yJztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIC8vIEtlZXAgR1NBUCBsaWJyYXJpZXMgdG9nZXRoZXJcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2dzYXAvJykpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdnc2FwLXZlbmRvcic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBFbnN1cmUgYWxsIFJhZGl4IFVJIGNvbXBvbmVudHMgYXJlIGJ1bmRsZWQgdG9nZXRoZXJcclxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL0ByYWRpeC11aS8nKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3JhZGl4LXZlbmRvcic7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICAvLyBMZXQgb3RoZXIgZGVwZW5kZW5jaWVzIGJlIGNodW5rZWQgbm9ybWFsbHlcclxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyBBZGQgb3B0aW1pemVEZXBzIHRvIGltcHJvdmUgZGVwZW5kZW5jeSBvcHRpbWl6YXRpb25cclxuICBvcHRpbWl6ZURlcHM6IHtcclxuICAgIC8vIEZvcmNlIGluY2x1c2lvbiBvZiBSZWFjdCBhbmQgcmVsYXRlZCBwYWNrYWdlc1xyXG4gICAgaW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxyXG4gICAgLy8gRW5zdXJlIHByb3BlciBkZXBlbmRlbmN5IGRpc2NvdmVyeVxyXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcclxuICAgICAgZGVmaW5lOiB7XHJcbiAgICAgICAgZ2xvYmFsOiAnZ2xvYmFsVGhpcycsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFKaEMsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUVOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixpQkFBaUI7QUFBQSxNQUNqQixTQUFTLENBQUM7QUFBQSxJQUNaLENBQUM7QUFBQTtBQUFBLElBRUQsU0FBUyxpQkFDVCxnQkFBZ0I7QUFBQSxFQUNsQixFQUFFLE9BQU8sT0FBTztBQUFBLEVBQ2hCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBO0FBQUEsSUFFQSxrQkFBa0I7QUFBQSxFQUNwQjtBQUFBO0FBQUEsRUFFQSxPQUFPO0FBQUE7QUFBQSxJQUVMLFdBQVc7QUFBQTtBQUFBLElBRVgsUUFBUTtBQUFBO0FBQUEsSUFFUixVQUFVO0FBQUE7QUFBQSxJQUVWLEtBQUs7QUFBQTtBQUFBLElBRUwsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYyxDQUFDLE9BQU87QUFFcEIsY0FBSSxHQUFHLFNBQVMscUJBQXFCLEtBQ2pDLEdBQUcsU0FBUyx5QkFBeUIsS0FDckMsR0FBRyxTQUFTLHlCQUF5QixLQUNyQyxHQUFHLFNBQVMsdUNBQXVDLEdBQUc7QUFDeEQsbUJBQU87QUFBQSxVQUNUO0FBRUEsY0FBSSxHQUFHLFNBQVMsb0JBQW9CLEdBQUc7QUFDckMsbUJBQU87QUFBQSxVQUNUO0FBRUEsY0FBSSxHQUFHLFNBQVMseUJBQXlCLEdBQUc7QUFDMUMsbUJBQU87QUFBQSxVQUNUO0FBRUEsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUVBLGNBQWM7QUFBQTtBQUFBLElBRVosU0FBUyxDQUFDLFNBQVMsYUFBYSxrQkFBa0I7QUFBQTtBQUFBLElBRWxELGdCQUFnQjtBQUFBLE1BQ2QsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
