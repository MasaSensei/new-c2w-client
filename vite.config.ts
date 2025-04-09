import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    host: true,
    port: 3000, // opsional, tapi disarankan biar pasti
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
