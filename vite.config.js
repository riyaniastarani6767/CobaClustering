// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// frontend/vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Ini penting untuk menyelesaikan path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ==========================================================
  // === BAGIAN INI UNTUK MENDEFINISIKAN PATH ALIAS '@' ===
  // ==========================================================
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ==========================================================
});
