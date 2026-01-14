import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: 'fallback',
      apply: 'serve',
      enforce: 'post',
      transform(code, id) {
        if (id.endsWith('.html')) {
          return code;
        }
      },
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            if (req.method !== 'GET' || req.url.includes('.')) {
              return next();
            }
            if (req.url.includes('/api/')) {
              return next();
            }
            req.url = '/index.html';
            next();
          });
        };
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
