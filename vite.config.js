import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
<<<<<<< HEAD

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
=======
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
>>>>>>> 940b92dbdb5d51bf4fd15e882390c395dda9e2d5
})
