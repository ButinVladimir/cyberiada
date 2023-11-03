import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import i18nextLoader from 'vite-plugin-i18next-loader'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    i18nextLoader({
      paths: ['./locales'],
      namespaceResolution: 'relativePath',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@state': path.resolve(__dirname, './src/state'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@templates': path.resolve(__dirname, './src/templates'),
    }
  }
});
