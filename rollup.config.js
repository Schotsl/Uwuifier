import typescript from '@rollup/plugin-typescript';

export default [
    {
        input: 'src/index.ts',
        output: {
            // Workaround for generating declarations https://github.com/rollup/plugins/issues/105
            dir: './',
            entryFileNames: 'dist/index.js',
            format: 'es',
        },
        plugins: [typescript({ declaration: true, declarationDir: 'dist/', rootDir: 'src/' })]
    },
    {
        input: 'src/index.ts',
        output: { 
            file: 'dist/index.cjs',
            format: 'cjs'
        },
        plugins: [typescript()]
    },
]