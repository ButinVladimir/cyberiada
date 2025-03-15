// @ts-check

import eslint from '@eslint/js';
import tsEsConfig from 'typescript-eslint';
import globals from 'globals';
import wcConfig from 'eslint-plugin-wc';
import litConfig from 'eslint-plugin-lit';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { globalIgnores } from 'eslint/config';

export default tsEsConfig.config(
  globalIgnores(['**/dist/*', '.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', '**/*.d.ts', 'postcss.config.js']),
  {
    extends: [
      eslint.configs.recommended,
      tsEsConfig.configs.strict,
      tsEsConfig.configs.stylistic,
      wcConfig.configs['flat/recommended'],
      litConfig.configs['flat/recommended'],
      eslintConfigPrettier,
    ],
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'semi-style': ['error', 'last'],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
