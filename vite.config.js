import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [react(), Inspect()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
