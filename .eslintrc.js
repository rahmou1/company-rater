module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 2,
    semi: [1, 'never'],
    quotes: ['error', 'single'],
    'no-console': 1,
    'no-var': 'error',
    'prefer-const': 'error',
  },
};
