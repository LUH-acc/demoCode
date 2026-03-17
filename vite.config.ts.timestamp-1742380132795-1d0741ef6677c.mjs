// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/code/demoCode/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///D:/code/demoCode/node_modules/vite-plugin-html/dist/index.mjs";
import vue from "file:///D:/code/demoCode/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import AutoImport from "file:///D:/code/demoCode/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/code/demoCode/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///D:/code/demoCode/node_modules/unplugin-vue-components/dist/resolvers.js";
import VueJsx from "file:///D:/code/demoCode/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\code\\demoCode";
var vite_config_default = ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      "process.env": env
    },
    server: {
      port: 3005,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    },
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    },
    plugins: [
      vue(),
      VueJsx(),
      createHtmlPlugin(),
      Components({
        resolvers: [VantResolver()]
      }),
      // 自动导入api
      AutoImport({
        imports: ["vue", "vue-router"],
        // 设置为在'src/'目录下生成解决ts报错，默认是当前目录('./'，即根目录)
        dts: "src/auto-import.d.ts",
        // 自动生成'eslintrc-auto-import.json'文件，在'.eslintrc.cjs'的'extends'中引入解决报错
        // 'vue-global-api'这个插件仅仅解决vue3 hook报错
        eslintrc: {
          enabled: true
        }
      })
    ],
    // vite.config.ts
    build: {
      outDir: "dist",
      // 指定打包路径，默认为项目根目录下的 dist 目录
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true,
          // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === "true",
          // 去除 console
          drop_debugger: true
          // 去除 debugger
        }
      },
      chunkSizeWarningLimit: 1500
      // chunk 大小警告的限制（以 kbs 为单位）
    },
    base: "./",
    // vite.config.ts
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(__vite_injected_original_dirname, "src/styles/index.less")}";`
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGRlbW9Db2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxjb2RlXFxcXGRlbW9Db2RlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9jb2RlL2RlbW9Db2RlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgVmFudFJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgVnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcclxuICAvLyBcdTgzQjdcdTUzRDZcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpXHJcbiAgcmV0dXJuIGRlZmluZUNvbmZpZyh7XHJcbiAgICBkZWZpbmU6IHtcclxuICAgICAgJ3Byb2Nlc3MuZW52JzogZW52LFxyXG4gICAgfSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBwb3J0OiAzMDA1LFxyXG4gICAgICBob3N0OiAnMC4wLjAuMCcsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKCksXHJcbiAgICAgIFZ1ZUpzeCgpLFxyXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKCksXHJcbiAgICAgIENvbXBvbmVudHMoe1xyXG4gICAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXSxcclxuICAgICAgfSksXHJcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NWFwaVxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJ10sXHJcbiAgICAgICAgLy8gXHU4QkJFXHU3RjZFXHU0RTNBXHU1NzI4J3NyYy8nXHU3NkVFXHU1RjU1XHU0RTBCXHU3NTFGXHU2MjEwXHU4OUUzXHU1MUIzdHNcdTYyQTVcdTk1MTlcdUZGMENcdTlFRDhcdThCQTRcdTY2MkZcdTVGNTNcdTUyNERcdTc2RUVcdTVGNTUoJy4vJ1x1RkYwQ1x1NTM3M1x1NjgzOVx1NzZFRVx1NUY1NSlcclxuICAgICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnQuZC50cycsXHJcbiAgICAgICAgLy8gXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwJ2VzbGludHJjLWF1dG8taW1wb3J0Lmpzb24nXHU2NTg3XHU0RUY2XHVGRjBDXHU1NzI4Jy5lc2xpbnRyYy5janMnXHU3Njg0J2V4dGVuZHMnXHU0RTJEXHU1RjE1XHU1MTY1XHU4OUUzXHU1MUIzXHU2MkE1XHU5NTE5XHJcbiAgICAgICAgLy8gJ3Z1ZS1nbG9iYWwtYXBpJ1x1OEZEOVx1NEUyQVx1NjNEMlx1NEVGNlx1NEVDNVx1NEVDNVx1ODlFM1x1NTFCM3Z1ZTMgaG9va1x1NjJBNVx1OTUxOVxyXG4gICAgICAgIGVzbGludHJjOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgXSxcclxuICAgIC8vIHZpdGUuY29uZmlnLnRzXHJcblxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgb3V0RGlyOiAnZGlzdCcsIC8vIFx1NjMwN1x1NUI5QVx1NjI1M1x1NTMwNVx1OERFRlx1NUY4NFx1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQVx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NCBkaXN0IFx1NzZFRVx1NUY1NVxyXG4gICAgICBzb3VyY2VtYXA6IGVudi5WSVRFX0JVSUxEX1NPVVJDRU1BUCA9PT0gJ3RydWUnLFxyXG4gICAgICAvLyBtaW5pZnlcdTlFRDhcdThCQTRlc2J1aWxkXHVGRjBDZXNidWlsZFx1NkEyMVx1NUYwRlx1NEUwQnRlcnNlck9wdGlvbnNcdTVDMDZcdTU5MzFcdTY1NDhcclxuICAgICAgLy8gdml0ZTNcdTUzRDhcdTUzMTZcdUZGMUFUZXJzZXIgXHU3M0IwXHU1NzI4XHU2NjJGXHU0RTAwXHU0RTJBXHU1M0VGXHU5MDA5XHU0RjlEXHU4RDU2XHVGRjBDXHU1OTgyXHU2NzlDXHU0RjYwXHU0RjdGXHU3NTI4XHU3Njg0XHU2NjJGIGJ1aWxkLm1pbmlmeTogJ3RlcnNlcidcdUZGMENcdTRGNjBcdTk3MDBcdTg5ODFcdTYyNEJcdTUyQThcdTVCODlcdTg4QzVcdTVCODMgYG5wbSBhZGQgLUQgdGVyc2VyYFxyXG4gICAgICBtaW5pZnk6ICd0ZXJzZXInLFxyXG4gICAgICB0ZXJzZXJPcHRpb25zOiB7XHJcbiAgICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICAgIGtlZXBfaW5maW5pdHk6IHRydWUsIC8vIFx1OTYzMlx1NkI2MiBJbmZpbml0eSBcdTg4QUJcdTUzOEJcdTdGMjlcdTYyMTAgMS8wXHVGRjBDXHU4RkQ5XHU1M0VGXHU4MEZEXHU0RjFBXHU1QkZDXHU4MUY0IENocm9tZSBcdTRFMEFcdTc2ODRcdTYwMjdcdTgwRkRcdTk1RUVcdTk4OThcclxuICAgICAgICAgIGRyb3BfY29uc29sZTogZW52LlZJVEVfQlVJTERfRFJPUF9DT05TT0xFID09PSAndHJ1ZScsIC8vIFx1NTNCQlx1OTY2NCBjb25zb2xlXHJcbiAgICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLCAvLyBcdTUzQkJcdTk2NjQgZGVidWdnZXJcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDE1MDAsIC8vIGNodW5rIFx1NTkyN1x1NUMwRlx1OEI2Nlx1NTQ0QVx1NzY4NFx1OTY1MFx1NTIzNlx1RkYwOFx1NEVFNSBrYnMgXHU0RTNBXHU1MzU1XHU0RjREXHVGRjA5XHJcbiAgICB9LFxyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIC8vIHZpdGUuY29uZmlnLnRzXHJcblxyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBsZXNzOiB7XHJcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCBcIiR7cmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc3R5bGVzL2luZGV4Lmxlc3MnKX1cIjtgLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3TyxTQUFTLGNBQWMsZUFBZTtBQUM5USxTQUFTLHdCQUF3QjtBQUNqQyxPQUFPLFNBQVM7QUFDaEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQVBuQixJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBTTtBQUVwQyxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFFBQVE7QUFBQSxNQUNOLGVBQWU7QUFBQSxJQUNqQjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixPQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxNQUNqQixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsTUFDNUIsQ0FBQztBQUFBO0FBQUEsTUFFRCxXQUFXO0FBQUEsUUFDVCxTQUFTLENBQUMsT0FBTyxZQUFZO0FBQUE7QUFBQSxRQUU3QixLQUFLO0FBQUE7QUFBQTtBQUFBLFFBR0wsVUFBVTtBQUFBLFVBQ1IsU0FBUztBQUFBLFFBQ1g7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUE7QUFBQSxJQUdBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQTtBQUFBLE1BQ1IsV0FBVyxJQUFJLHlCQUF5QjtBQUFBO0FBQUE7QUFBQSxNQUd4QyxRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixVQUFVO0FBQUEsVUFDUixlQUFlO0FBQUE7QUFBQSxVQUNmLGNBQWMsSUFBSSw0QkFBNEI7QUFBQTtBQUFBLFVBQzlDLGVBQWU7QUFBQTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsdUJBQXVCO0FBQUE7QUFBQSxJQUN6QjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUEsSUFHTixLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0IsWUFBWSxRQUFRLGtDQUFXLHVCQUF1QixDQUFDO0FBQUEsUUFDekU7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
