module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    '*.d.ts',
    'postcss.config.js',
    'tailwind.config.js',
    'twind.config.js'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ["@typescript-eslint"],
  rules: {
    'semi-style': ['error', 'last'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  parserOptions: {
    project: 'tsconfig.json',
  },
};
