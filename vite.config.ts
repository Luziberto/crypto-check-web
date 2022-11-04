import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "url"
import eslintPlugin from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/asset-web/" : "/",
  plugins: [vue(), eslintPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    },
  },
  server: {
    port: 3000
  }
})
