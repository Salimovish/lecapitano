import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
      },
    },
  },
  server: {
    host: '0.0.0.0', // Permet d'écouter sur toutes les adresses IP
    fs: {
      strict: false,
    },
  },
});
