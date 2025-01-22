import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'

const compat = new FlatCompat()

export default [
  js.configs.recommended,
  ...compat.config({
    extends: ['@rocketseat/eslint-config/react'],
    plugins: ['simple-import-sort'],
    rules: { 'simple-import-sort/imports': 'error' },
  }),
]
