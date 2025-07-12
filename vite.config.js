import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",

      srcDir: "src",
      filename: "sw.js", // Final output file name
      injectManifest: {
        swSrc: "src/sw-inject.js",
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        // Add these for better offline support
        globIgnores: ["**/node_modules/**/*", "**/sw.js.map"],
        dontCacheBustURLsMatching: /\.\w{8}\./,
      },
      // Enable these for better PWA support
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },

      // Path to the service worker source file

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
      build: {
        outDir: "dist",
        emptyOutDir: true,
      },
    }),
  ],
});
