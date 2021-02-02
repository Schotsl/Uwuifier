module.exports = {
    env: {
        'browser': true,
        'node': true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: { 
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
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