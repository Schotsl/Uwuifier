import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: pkg.module,
                format: 'esm',
            },
            {
                file: pkg.main,
                format: 'cjs',
                exports: 'auto',
            },
        ],
        plugins: [
            typescript({ useTsconfigDeclarationDir: true }),
            terser({ format: { comments: false }, keep_classnames: true }),
        ],
    },
];