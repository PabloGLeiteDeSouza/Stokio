// eslint.config.js

import eslint_plugin from '@typescript-eslint/eslint-plugin';
import eslint_recomended from '@typescript-eslint/recommended';
import prettier_recomended from 'prettier/recommended';

export default [
    
  {
    plugins: {
      '@typescript-eslint/recommended': eslint_recomended,
      'prettier/recommended': prettier_recomended,
    },
  },
  {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    files: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    plugins: {
      '@typescript-eslint/eslint-plugin': eslint_plugin,
    },
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignorePatterns: ['.eslintrc.js', 'eslint.config.js'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
