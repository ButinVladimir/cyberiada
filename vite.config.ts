import { defineConfig } from 'vite';
import i18nextLoader from 'vite-plugin-i18next-loader';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

const iconsPath = 'node_modules/@shoelace-style/shoelace/dist/assets/*';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    i18nextLoader({
      paths: ['./locales'],
      namespaceResolution: 'relativePath',
    }),
    viteStaticCopy({
      targets: [
        {
          src: iconsPath,
          dest: 'shoelace/assets',
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@helpers',
        replacement: path.resolve(__dirname, './src/helpers'),
      },
      {
        find: '@state',
        replacement: path.resolve(__dirname, './src/state'),
      },
      {
        find: /\/assets\/icons\/(.+)/,
        replacement: `${iconsPath}/$1`,
      }
    ]
  },
  build: {
    rollupOptions: {
      plugins: [],
    }
  },
});
