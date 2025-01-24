import react from '@vitejs/plugin-react-swc'
import UnoCss from 'unocss/vite'
import { defineConfig } from 'vitest/config'
import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import alias from '@rollup/plugin-alias'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export default defineConfig({
    test: {
        includeSource: ['src/utils/pinyin.js'],
    },
    plugins: [react(), UnoCss()],
    base: './',
    build: {
        outDir: '../page',
        rollupOptions: {
            // external: ["shareds"],
            plugins: [
                // 使用 alias 插件来为本地模块创建别名
                alias({
                    entries: [
                        {
                            find: 'shareds',
                            replacement: path.resolve(
                                __dirname,
                                'shareds/index'
                            ),
                        },
                    ],
                }),
                // 使用 resolve 插件，确保 Rollup 可以解析别名路径
                resolve(),
            ],
        },
        commonjsOptions: {
            include: [/shareds/, /node_modules/],
        },
    },
    server: {
        port: 4000,
    },
    optimizeDeps: {
        include: ['shareds'],
    },
})
