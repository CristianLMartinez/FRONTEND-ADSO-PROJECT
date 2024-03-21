/// <reference types="vitest" />
/// <reference types="Vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false,
    },
    port: 5174
  },
  resolve: {
    alias: [
      {find: "@", replacement: path.resolve(__dirname, './src')},
      {find: "@/components", replacement: path.resolve(__dirname, "./src/components")}
    ]
  },
  test: {
    globals: true,
    environment: "jsdom"
  }
})
