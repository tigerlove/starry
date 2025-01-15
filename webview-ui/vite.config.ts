import { defineConfig } from "vite";
import type { PreRenderedAsset } from 'rollup';
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        settings: resolve(__dirname, 'settings.html'),
        rules: resolve(__dirname, 'rules.html'),
      },
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: (assetInfo: PreRenderedAsset) => {
          // if (assetInfo.source?.toString().includes('@tailwind')) {
          //   return 'assets/[name].css';
          // }
          return 'assets/[name].[ext]';
        }
      }
    },
    outDir: "build",
    assetsDir: "assets",
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
  },
});
