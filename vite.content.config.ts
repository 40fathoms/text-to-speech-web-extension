import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './src/content.ts')
      },
      output: {
        entryFileNames: 'assets/content.js',
        inlineDynamicImports: true
      }
    }
  }
});
