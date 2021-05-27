import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { main as cjs_output, module as esm_output } from './package.json';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                file: esm_output,
                format: 'esm',
            },
            {
                file: cjs_output,
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