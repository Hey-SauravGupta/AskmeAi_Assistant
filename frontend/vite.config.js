// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // <-- Ye line add karein

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(), // <-- Ye line add karein
  ],
})