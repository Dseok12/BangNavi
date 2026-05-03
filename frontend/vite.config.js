import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

/**
 * 폴더트리 기준 Alias
 * - @  : /src
 * - @api : /src/api
 * - @components : /src/components
 * - @css : /src/css
 * - @layouts : /src/layouts
 * - @pages : /src/pages
 * - @routers : /src/routers
 * - @stores : /src/stores
 * 
 * 사용 예시
 * import router from '@routers'
 * import router from '@routers/index.js'
 * 
 * import http from '@api/http'
 * import '@css/base/reset.css'
 * import '@css/common/style.css'
 * import Header from '@components/common/Header.vue'
 */
export default defineConfig({
  // 저장소 이름인 vue-mdn을 양쪽에 슬래시(/)를 포함하여 입력합니다.
  //base: '/vue-mdn/',
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),

      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@css': path.resolve(__dirname, 'src/css'),

      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),

      '@routers': path.resolve(__dirname, 'src/routers'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@dataes': path.resolve(__dirname, 'src/dataes'),

    }
  },

  server: {
    port: 3000,
    strictPort: true
  },

  preview: {
    port: 3000,
    strictPort: true
  }
})