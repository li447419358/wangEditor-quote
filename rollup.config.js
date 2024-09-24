/*
 * @Author: dengxi
 * @Date: 2024-09-20 16:45:26
 * @LastEditors: dengxi
 * @LastEditTime: 2024-09-20 17:23:49
 * @Description: 
 */
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
    input: 'src/index.ts',
    output: {
        file: './dist/index.js',
        format: 'es'
    },
    plugins: [
        json(),
        typescript(),
        terser({
            compress: {
                // 删除console
                drop_console: true,
            }
        })
    ]
}