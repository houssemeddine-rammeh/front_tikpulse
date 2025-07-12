import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "autoUpdate",
      injectRegister: false,

      // IMPORTANT: Add globDirectory here!
      injectManifest: {
        globDirectory: "dist",  // <- Add this line to fix glob pattern warnings/errors
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        maximumFileSizeToCacheInBytes: 5000000,
      },

      // Remove the 'workbox' config here because it's not used with injectManifest strategy
      // Instead, handle runtime caching inside your custom sw.js

      manifest: {
        name: "Tik Pulse",
        short_name: "Tik Pulse App",
        description: "Tik Pulse",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
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
