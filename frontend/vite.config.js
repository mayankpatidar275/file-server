import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // Production build output directory
  },
  server: {
    fs: {
      strict: false,
      // Specify a different directory for development builds
      // Note: This is optional and generally not recommended for development
      base: 'dev'
    }
  }
});
