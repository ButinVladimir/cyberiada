import { defineConfig } from 'vite';
import i18nextLoader from 'vite-plugin-i18next-loader'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    i18nextLoader({
      paths: ['./locales'],
      namespaceResolution: 'relativePath',
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
    }
  }
});
