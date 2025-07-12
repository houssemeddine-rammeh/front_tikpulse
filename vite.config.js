import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      injectRegister: false,
      manifest: {
        name: "TikPulse",
        short_name: "TikPulse",
        description: "TikPulse - TikPulse",
        theme_color: "#0098c3",
        background_color: "#065781",
        display: "standalone",
        orientation: "portrait",
        id: "p4p.app",
        categories: ["entertainment", "lifestyle", "social"],
        icons: [
          {
            src: "/icons/192x.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/512x.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/48x.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "/icons/96x.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icons/144x.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/384x.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/72x.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icons/152x.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/128x.png",
            sizes: "128x128",
            type: "image/png",
          },
        ],
      },
      injectManifest: {
        maximumFileSizeToCacheInBytes: 5000000,
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        globIgnores: ["**/node_modules/**/*", "sw.js"],
      },
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        type: "module",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        globIgnores: ["**/node_modules/**/*", "sw.js"],
        maximumFileSizeToCacheInBytes: 5000000,
      },
    }),
  ],
});
