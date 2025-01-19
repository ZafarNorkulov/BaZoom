import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   host: 'tgbot.local',
  //   https: true,
  //   port: 443,
  //   proxy: {
  //     "/api": {
  //       target: "https://bot.bazoom.ru/api/",
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       configure: (proxy) => {
  //         proxy.on('proxyReq', (proxyReq) => {
  //           proxyReq.setHeader('Authorization', 'Bearer fgnokuwerDFBjcbvlijrt98Q5iwhebjasCjknfd0b293hgthvJDdlfoJ0918brklhho');
  //         });
  //       },
  //     },
  //   },
  // },
  plugins: [react()],
});
