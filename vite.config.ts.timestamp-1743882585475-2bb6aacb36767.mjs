// vite.config.ts
import { defineConfig } from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { componentTagger } from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/lovable-tagger/dist/index.js";
import commonjs from "file:///C:/Users/ifeol/OneDrive/Documents/RAADE%20Website/raade-website/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
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
    mode === "development" && componentTagger(),
    // Add commonjs plugin with stricter options to prevent TDZ errors
    commonjs({
      transformMixedEsModules: true,
      strictRequires: true
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    },
    dedupe: ["react", "react-dom"],
    preserveSymlinks: true
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    // Improve transpilation to handle temporal dead zone errors
    target: "es2018",
    commonjsOptions: {
      transformMixedEsModules: true,
      // Prevent hoisting which can cause TDZ errors
      strictRequires: true
    },
    rollupOptions: {
      // Ensure external dependencies are properly handled
      external: [],
      output: {
        // Improve code splitting to avoid circular dependencies
        experimentalMinChunkSize: 1e4,
        manualChunks: function manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-framer-motion";
            }
            if (id.includes("@radix-ui") || id.includes("lucide")) {
              return "vendor-ui";
            }
            return "vendor";
          }
        }
      }
    }
  },
  // Add optimizeDeps to improve dependency optimization
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020",
      // Ensure proper handling of dynamic imports
      splitting: true
    },
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "@radix-ui/react-dialog",
      "lucide-react",
      "react-router-dom"
    ],
    exclude: []
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZmVvbFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUkFBREUgV2Vic2l0ZVxcXFxyYWFkZS13ZWJzaXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxpZmVvbFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcUkFBREUgV2Vic2l0ZVxcXFxyYWFkZS13ZWJzaXRlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9pZmVvbC9PbmVEcml2ZS9Eb2N1bWVudHMvUkFBREUlMjBXZWJzaXRlL3JhYWRlLXdlYnNpdGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBjb21wb25lbnRUYWdnZXIgfSBmcm9tIFwibG92YWJsZS10YWdnZXJcIjtcbmltcG9ydCBjb21tb25qcyBmcm9tICdAcm9sbHVwL3BsdWdpbi1jb21tb25qcyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgICAvLyBBZGQgbW9yZSByb2J1c3QgZXJyb3IgaGFuZGxpbmcgZm9yIGRlcGVuZGVuY3kgcmVzb2x1dGlvblxuICAgIGhtcjoge1xuICAgICAgb3ZlcmxheTogdHJ1ZSxcbiAgICB9LFxuICAgIC8vIEVuc3VyZSB3YXRjaCBvcHRpb25zIGFyZSBwcm9wZXJseSBzZXQgZm9yIGZpbGUgc3lzdGVtIGV2ZW50c1xuICAgIHdhdGNoOiB7XG4gICAgICB1c2VQb2xsaW5nOiBmYWxzZSxcbiAgICAgIGludGVydmFsOiAxMDAsXG4gICAgfSxcbiAgfSxcbiAgLy8gQ2xlYXIgdGhlIGNhY2hlIG9uIHN0YXJ0XG4gIGNhY2hlRGlyOiAnLnZpdGUnLFxuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAganN4SW1wb3J0U291cmNlOiBcInJlYWN0XCIsXG4gICAgICBwbHVnaW5zOiBbXSxcbiAgICB9KSxcbiAgICAvLyBPbmx5IHVzZSBjb21wb25lbnRUYWdnZXIgaW4gZGV2ZWxvcG1lbnQgbW9kZVxuICAgIG1vZGUgPT09ICdkZXZlbG9wbWVudCcgJiZcbiAgICBjb21wb25lbnRUYWdnZXIoKSxcbiAgICAvLyBBZGQgY29tbW9uanMgcGx1Z2luIHdpdGggc3RyaWN0ZXIgb3B0aW9ucyB0byBwcmV2ZW50IFREWiBlcnJvcnNcbiAgICBjb21tb25qcyh7XG4gICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZSxcbiAgICAgIHN0cmljdFJlcXVpcmVzOiB0cnVlXG4gICAgfSlcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgICBkZWR1cGU6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgcHJlc2VydmVTeW1saW5rczogdHJ1ZVxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICAvLyBJbXByb3ZlIHRyYW5zcGlsYXRpb24gdG8gaGFuZGxlIHRlbXBvcmFsIGRlYWQgem9uZSBlcnJvcnNcbiAgICB0YXJnZXQ6ICdlczIwMTgnLFxuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgICAvLyBQcmV2ZW50IGhvaXN0aW5nIHdoaWNoIGNhbiBjYXVzZSBURFogZXJyb3JzXG4gICAgICBzdHJpY3RSZXF1aXJlczogdHJ1ZSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIC8vIEVuc3VyZSBleHRlcm5hbCBkZXBlbmRlbmNpZXMgYXJlIHByb3Blcmx5IGhhbmRsZWRcbiAgICAgIGV4dGVybmFsOiBbXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBJbXByb3ZlIGNvZGUgc3BsaXR0aW5nIHRvIGF2b2lkIGNpcmN1bGFyIGRlcGVuZGVuY2llc1xuICAgICAgICBleHBlcmltZW50YWxNaW5DaHVua1NpemU6IDEwMDAwLFxuICAgICAgICBtYW51YWxDaHVua3M6IGZ1bmN0aW9uIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGNodW5rIGZvciBSZWFjdFxuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdyZWFjdCcpIHx8IGlkLmluY2x1ZGVzKCdyZWFjdC1kb20nKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1yZWFjdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIGNodW5rIGZvciBGcmFtZXIgTW90aW9uXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2ZyYW1lci1tb3Rpb24nKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvci1mcmFtZXItbW90aW9uJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgY2h1bmsgZm9yIFVJIGNvbXBvbmVudHNcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHJhZGl4LXVpJykgfHwgaWQuaW5jbHVkZXMoJ2x1Y2lkZScpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLXVpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRGVmYXVsdCB2ZW5kb3IgY2h1bmtcbiAgICAgICAgICAgIHJldHVybiAndmVuZG9yJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIC8vIEFkZCBvcHRpbWl6ZURlcHMgdG8gaW1wcm92ZSBkZXBlbmRlbmN5IG9wdGltaXphdGlvblxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBlc2J1aWxkT3B0aW9uczoge1xuICAgICAgdGFyZ2V0OiAnZXMyMDIwJyxcbiAgICAgIC8vIEVuc3VyZSBwcm9wZXIgaGFuZGxpbmcgb2YgZHluYW1pYyBpbXBvcnRzXG4gICAgICBzcGxpdHRpbmc6IHRydWUsXG4gICAgfSxcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLCBcbiAgICAgICdyZWFjdC1kb20nLCBcbiAgICAgICdmcmFtZXItbW90aW9uJywgXG4gICAgICAnQHJhZGl4LXVpL3JlYWN0LWRpYWxvZycsIFxuICAgICAgJ2x1Y2lkZS1yZWFjdCcsXG4gICAgICAncmVhY3Qtcm91dGVyLWRvbSdcbiAgICBdLFxuICAgIGV4Y2x1ZGU6IFtdXG4gIH1cbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVgsU0FBUyxvQkFBb0I7QUFDdFosT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUNoQyxPQUFPLGNBQWM7QUFKckIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU87QUFBQSxFQUN6QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUVOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUE7QUFBQSxJQUVBLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsTUFDSixpQkFBaUI7QUFBQSxNQUNqQixTQUFTLENBQUM7QUFBQSxJQUNaLENBQUM7QUFBQTtBQUFBLElBRUQsU0FBUyxpQkFDVCxnQkFBZ0I7QUFBQTtBQUFBLElBRWhCLFNBQVM7QUFBQSxNQUNQLHlCQUF5QjtBQUFBLE1BQ3pCLGdCQUFnQjtBQUFBLElBQ2xCLENBQUM7QUFBQSxFQUNILEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFDaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsSUFDQSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsSUFDN0Isa0JBQWtCO0FBQUEsRUFDcEI7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBRVgsUUFBUTtBQUFBLElBQ1IsaUJBQWlCO0FBQUEsTUFDZix5QkFBeUI7QUFBQTtBQUFBLE1BRXpCLGdCQUFnQjtBQUFBLElBQ2xCO0FBQUEsSUFDQSxlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVUsQ0FBQztBQUFBLE1BQ1gsUUFBUTtBQUFBO0FBQUEsUUFFTiwwQkFBMEI7QUFBQSxRQUMxQixjQUFjLFNBQVMsYUFBYSxJQUFJO0FBQ3RDLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUUvQixnQkFBSSxHQUFHLFNBQVMsT0FBTyxLQUFLLEdBQUcsU0FBUyxXQUFXLEdBQUc7QUFDcEQscUJBQU87QUFBQSxZQUNUO0FBR0EsZ0JBQUksR0FBRyxTQUFTLGVBQWUsR0FBRztBQUNoQyxxQkFBTztBQUFBLFlBQ1Q7QUFHQSxnQkFBSSxHQUFHLFNBQVMsV0FBVyxLQUFLLEdBQUcsU0FBUyxRQUFRLEdBQUc7QUFDckQscUJBQU87QUFBQSxZQUNUO0FBR0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixnQkFBZ0I7QUFBQSxNQUNkLFFBQVE7QUFBQTtBQUFBLE1BRVIsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUM7QUFBQSxFQUNaO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
