// vite.config.ts
import { defineConfig } from "file:///C:/Users/Anusha%20C/Desktop/infinity-health-portal-source/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Anusha%20C/Desktop/infinity-health-portal-source/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Anusha C\\Desktop\\infinity-health-portal-source";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080
  },
  plugins: [
    react(),
    {
      name: "fallback",
      apply: "serve",
      enforce: "post",
      transform(code, id) {
        if (id.endsWith(".html")) {
          return code;
        }
      },
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (req.method !== "GET" || req.url.includes(".")) {
              return next();
            }
            if (req.url.includes("/api/")) {
              return next();
            }
            req.url = "/index.html";
            next();
          });
        };
      }
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbnVzaGEgQ1xcXFxEZXNrdG9wXFxcXGluZmluaXR5LWhlYWx0aC1wb3J0YWwtc291cmNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbnVzaGEgQ1xcXFxEZXNrdG9wXFxcXGluZmluaXR5LWhlYWx0aC1wb3J0YWwtc291cmNlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9BbnVzaGElMjBDL0Rlc2t0b3AvaW5maW5pdHktaGVhbHRoLXBvcnRhbC1zb3VyY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAge1xuICAgICAgbmFtZTogJ2ZhbGxiYWNrJyxcbiAgICAgIGFwcGx5OiAnc2VydmUnLFxuICAgICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgICAgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICAgIGlmIChpZC5lbmRzV2l0aCgnLmh0bWwnKSkge1xuICAgICAgICAgIHJldHVybiBjb2RlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ0dFVCcgfHwgcmVxLnVybC5pbmNsdWRlcygnLicpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxLnVybC5pbmNsdWRlcygnL2FwaS8nKSkge1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVxLnVybCA9ICcvaW5kZXguaHRtbCc7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0sXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVcsU0FBUyxvQkFBb0I7QUFDaFksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsVUFBVSxNQUFNLElBQUk7QUFDbEIsWUFBSSxHQUFHLFNBQVMsT0FBTyxHQUFHO0FBQ3hCLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGdCQUFnQixRQUFRO0FBQ3RCLGVBQU8sTUFBTTtBQUNYLGlCQUFPLFlBQVksSUFBSSxDQUFDLEtBQUssS0FBSyxTQUFTO0FBQ3pDLGdCQUFJLElBQUksV0FBVyxTQUFTLElBQUksSUFBSSxTQUFTLEdBQUcsR0FBRztBQUNqRCxxQkFBTyxLQUFLO0FBQUEsWUFDZDtBQUNBLGdCQUFJLElBQUksSUFBSSxTQUFTLE9BQU8sR0FBRztBQUM3QixxQkFBTyxLQUFLO0FBQUEsWUFDZDtBQUNBLGdCQUFJLE1BQU07QUFDVixpQkFBSztBQUFBLFVBQ1AsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
