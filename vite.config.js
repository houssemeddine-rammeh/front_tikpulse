import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Basic Configuration
      strategies: "generateSW",
      srcDir: "src",
      filename: "sw.js",
      registerType: "prompt",

      // Manifest Configuration
      manifest: {
        name: "TikPulse",
        short_name: "TikPulse",
        description: "TikPulse - TikPulse",
        theme_color: "#0098c3",
        background_color: "#065781",
        display: "standalone",
        orientation: "portrait",
        id: "/",
        start_url: "/",
        categories: ["entertainment", "lifestyle", "social"],
        icons: [
          {
            src: "/icons/192x.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/512x.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      // Workbox Configuration for v7
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2,woff}"],
        globIgnores: ["**/node_modules/**/*", "**/sw*.js", "**/workbox-*.js"],
        maximumFileSizeToCacheInBytes: 8000000,
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 5 * 60, // 5 minutes
              },
            },
          },
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        offlineGoogleAnalytics: false,
      },

      // Dev Options
      devOptions: {
        enabled: false, // Disable in dev to prevent errors
        type: "module",
        navigateFallbackAllowlist: [/^\/$/],
      },

      // Workbox v7 specific
      injectManifest: false, // Force generateSW strategy
    }),
  ],
});
