import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
const BASE_URL = "http://localhost:8000"
export default defineConfig({
  plugins: [
    vue(),
    // 自动导入 Vue API
    AutoImport({
      imports: ['vue', 'vue-router', {
      'element-plus': [
        'ElMessage',      // 👈 就加这个
        'ElMessageBox',
        'ElNotification',
      ],
    },],
      dts: 'src/auto-import.d.ts', // 自动生成在这里
      resolvers: [ElementPlusResolver()],
    }),
    // 自动导入组件
    Components({
      dts: 'src/components.d.ts', // 自动生成在这里
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5174,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target:BASE_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})