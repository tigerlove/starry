import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'index.css') {
            const chunk = assetInfo.source?.toString() || '';
            if (chunk.includes('settings')) {
              return 'assets/settings.css';
            }
            if (chunk.includes('rules')) {
              return 'assets/rules.css';
            }
            return 'assets/index.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    },
    outDir: "build",
    assetsDir: "assets",
  },
  server: {
    port: 3000,
  },
});
