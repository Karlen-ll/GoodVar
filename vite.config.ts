import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // resolve: {
  //   alias: { '@/': path.resolve(__dirname, '/src') },
  // },

  css: {
    preprocessorOptions: { scss: { additionalData: '@use "./src/styles/resources" as *;' } },
  },

  plugins: [vue(), svgLoader({ defaultImport: 'component' })],
})

/**
 * {@link https://vitejs.dev/config/ Vite config}
 * {@link https://github.com/jpkleemans/vite-svg-loader Vite SVG loader}
 */
