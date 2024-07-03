import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const manifestForPlugin = {
  registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touch-icon.png"],
  manifest: {
    name: "Jovem Trabalhador",
    short_name: "Jovem Trabalhador",
    description: "Um app para registrar alunos de maneira simples e eficiente.",
    icons: [
      {
        src: "./android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
    ],
    theme_color: "#F58634",
    background_color: "#ffffff",
    display: "fullscreen",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
  workbox: {
    globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/your-cdn-url\.com\//,
        handler: "CacheFirst",
        options: {
          cacheName: "cdn-cache",
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
          },
        },
      },
      {
        urlPattern: ({ request }) =>
          request.destination === "document" ||
          request.destination === "script" ||
          request.destination === "style",
        handler: "NetworkFirst",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
          },
        },
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
});
