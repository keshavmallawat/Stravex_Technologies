import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";      // switch from -swc to this
import path from "path";

export default defineConfig({
  base: "/",
  server: { host: "::", port: 8080 },
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    sourcemap: "inline",                        // keep for debugging; we can revert later
    chunkSizeWarningLimit: 700,
    // Avoid custom vendor chunk splitting; let Rollup decide to prevent TDZ/circular issues
    // rollupOptions intentionally removed
  },
});