/*
 * @Author: dengxi
 * @Date: 2024-09-20 16:45:26
 * @LastEditors: dengxi
 * @LastEditTime: 2024-09-20 17:23:49
 * @Description:
 */
import typescript from '@rollup/plugin-typescript'

export default {
    input: 'src/index.ts',
    output: {
        file: './dist/quote.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [
        typescript({
            tsconfig: './tsconfig.json',
            declaration: true,
        }),
    ],
    // 运行时依赖不打入产物，交由消费方安装
    external: ['@wangeditor/editor', 'snabbdom'],
}
