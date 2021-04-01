module.exports = {
    env: {
        'node': true,
    },
    parser: '@typescript-eslint/parser',
    plugins: [
        'jest',
        '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:jest/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single'],
    },
}