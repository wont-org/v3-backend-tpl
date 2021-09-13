import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { join } from 'path'
import { pickBy } from 'lodash'
// https://github.com/anncwb/vite-plugin-style-import
import styleImport from 'vite-plugin-style-import'
import { backendConfig } from './src/config'

// console.log('vite config import.meta.env :>> ', import.meta.env)

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    const isLocal = command === 'serve'
    const base = isLocal ? '/' : backendConfig.base
    const alias = {
        '@': join(__dirname, 'src'),
    }
    return {
        plugins: [
            vueJsx({
                mergeProps: false, // 防止写 多个onXXX 被合并后，函数回调错误
            }),
            styleImport({
                libs: [
                    {
                        libraryName: 'ant-design-vue',
                        esModule: true,
                        resolveStyle: (name) => {
                            return `ant-design-vue/es/${name}/style/index`
                        },
                    },
                ],
            }),
        ],
        resolve: {
            alias: pickBy(alias),
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                },
            },
            modules: {
                localsConvention: 'camelCase',
            },
        },
        base,
    }
})
