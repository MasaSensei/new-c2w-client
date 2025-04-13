import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: true,
    port: 3002,
    allowedHosts: [
      "towewew18.online",
      "konveksi-dev.towewew18.online",
      "localhost",
    ],
    cors: {
      origin: [
        "towewew18.online",
        "konveksi-dev.towewew18.online",
        "localhost",
      ],
      credentials: true,
    },
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
