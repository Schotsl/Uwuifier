import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.ts',
        output: {
            // Workaround for generating declarations https://github.com/rollup/plugins/issues/105
            dir: 'dist/',
            format: 'es',
        },
        plugins: [terser(), typescript({ declaration: true, declarationDir: 'dist/' })]
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.cjs',
            format: 'cjs'
        },
        plugins: [terser(), typescript()]
    },
];