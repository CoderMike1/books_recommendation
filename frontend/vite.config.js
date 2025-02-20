import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-router-dom",'react-icons/fa']
  },
  server:{
    host:"0.0.0.0",
    port:5173
  },
  build: {
    outDir: "build"
  },
  base: "/"
})
