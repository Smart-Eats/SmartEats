import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: process.env.PORT || 5173,
    host: true,
  },
  preview: {
    port: process.env.PORT || 4173,
    host: true,
    allowedHosts: ["smarteats-frontend.onrender.com"],
  },
});
