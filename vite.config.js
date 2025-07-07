import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",

      // Path to the service worker source file
      srcDir: "src",
      filename: "sw-inject.js", // final file inside dist

      injectManifest: {
        swSrc: "src/sw-inject.js", // required
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
      },

      registerType: "autoUpdate",
      injectRegister: false,

      manifest: {
        name: "Tik Pulse",
        short_name: "Tik Pulse",
        description: "Tik Pulse",
        theme_color: "#0098c3",
        background_color: "#065781",
        display: "standalone",
        orientation: "portrait",
        id: "tikPulse.app",
        categories: ["entertainment", "lifestyle", "social"],
        icons: [
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
