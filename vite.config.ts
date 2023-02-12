import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@atom': path.resolve(__dirname, './src/components/common'),
      '@serp': path.resolve(__dirname, './src/components/serp'),
    },
  },

  css: {
    preprocessorOptions: { scss: { additionalData: '@use "./src/styles/resources" as *;' } },
  },

  plugins: [vue(), svgLoader({ defaultImport: 'component' })],
})

/**
 * {@link https://vitejs.dev/config/ Vite config}
 * {@link https://github.com/jpkleemans/vite-svg-loader Vite SVG loader}
 */
