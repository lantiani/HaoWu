import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vite'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig((...args) => {
  return {
    plugins: [createVuePlugin()],
    // 代理跨域请求
    server: {
      proxy: {
        '/myapi': {
          target: 'http://localhost:8800/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/myapi/,'')
        },
      }
    },
    resolve: {
      // 路劲别名
      alias: {
        '@': '/src',
        '@api': '/src/api'
      },
      // 配置后扩展名可不写
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    },
    // 删除console和debugger
    build:{
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      // 小于阈值的资源将转为 base64，。 设置为0禁用
      assetsInlineLimit: 4096 * 2, // => 8kb
      // CDN加速
      rollupOptions: {
        external: ["axios", "moment"],
        plugins: [
          commonjs(),
          externalGlobals({
            axios: "axios",
            moment: "moment",
          }),
        ],
      },
    },
  }
})