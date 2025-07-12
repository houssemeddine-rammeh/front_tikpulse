import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",            // Your custom service worker location
      filename: "sw.js",        // Output service worker in dist/
      injectRegister: false,
      registerType: "autoUpdate",

      // This part is critical: make sure globDirectory points to "dist"
      injectManifest: {
        globDirectory: "dist",
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        globIgnores: ["sw.js"],     // Exclude your own sw.js file from precache
        maximumFileSizeToCacheInBytes: 5000000,
      },

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
