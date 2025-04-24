import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import VueJsx from '@vitejs/plugin-vue-jsx'

// 若在vue中使用了异步组件（defineAsyncComponent），则最终构建产物中可能会出现名为_plugin-vue_export-helper.hash.js的文件。
//  但部分web服务器无法处理以_开头的文件（如golang中的http.FileServer或Github Pages），这将导致响应404
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    define: {
      'process.env': env,
    },
    server: {
      port: 3005,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      VueJsx(),
      createHtmlPlugin(),
      Components({
        resolvers: [VantResolver()],
      }),
      // 自动导入api
      AutoImport({
        imports: ['vue', 'vue-router'],
        // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
        dts: 'src/auto-import.d.ts',
        // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
        // 'vue-global-api'这个插件仅仅解决vue3 hook报错
        eslintrc: {
          enabled: true,
        },
      }),
    ],
    // vite.config.ts

    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      rollupOptions: {
        output: {
          entryFileNames: `js/[name]-[hash].js`,
          chunkFileNames: `js/[name]-[hash].js`,
          assetFileNames(assetInfo) {
            if (assetInfo.name.endsWith('.css')) {
              return `css/[name]-[hash].css`
            }
            const imgTypes = ['.jpg', '.jpeg', '.png', '.gif', '.ico', '.webp']

            if (imgTypes.some((type) => assetInfo.name.endsWith(type))) {
              return `images/[name]-[hash].[ext]`
            }
            return `assets/[name]-[hash].[ext]`
          },
          sanitizeFileName(fileName) {
            const match = DRIVE_LETTER_REGEX.exec(fileName)
            const driveLetter = match ? match[0] : ''
            return driveLetter + fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, '')
          },
        },
      },
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === 'true', // 去除 console
          drop_debugger: true, // 去除 debugger
        },
      },
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    },
    base: './',
    // vite.config.ts

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__dirname, 'src/styles/index.less')}";`,
        },
      },
    },
  })
}
