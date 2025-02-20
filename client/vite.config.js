import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0', // Make sure it's listening on all network interfaces
    port: 5173,       // Match the port you're exposing in the Dockerfile (5173)
  },
});
