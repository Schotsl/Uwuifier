import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'esm',
            },
            {
                file: 'dist/index.cjs',
                format: 'cjs',
                exports: 'auto',
            },
        ],
        plugins: [
            typescript({ useTsconfigDeclarationDir: true }),
            terser({ format: { comments: false } }),
        ],
    },
];