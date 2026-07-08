import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  {
    // ビルド成果物・退避ファイルは対象外
    ignores: ['contact/**', 'dist/**', '_remove/**', '**/node_modules/**'],
  },
  js.configs.recommended,
  {
    // サイト共通のブラウザ用スクリプト
    files: ['script.js', 'projects/**/*.js'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    // Node で動くビルド用スクリプト
    files: ['scripts/**/*.mjs', 'tailwind.config.js', 'contact-app/vite.config.js'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    // contact-app (Vite + React SPA)
    files: ['contact-app/src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
    },
  },
];
