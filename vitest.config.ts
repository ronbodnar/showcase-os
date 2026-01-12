import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@sharedIcons": path.resolve(__dirname, "./src/assets/icons/shared"),
      "@themeIcons": path.resolve(__dirname, "./src/assets/icons/themes"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
})
