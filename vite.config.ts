import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/mevibe/',
  root: '.',
  build: {
    outDir: 'dist',
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@animations': path.resolve(__dirname, 'src/animations'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use './src/styles/variables' as *;
          @use './src/styles/mixins' as *;
        `,
      },
    },
  },
});
