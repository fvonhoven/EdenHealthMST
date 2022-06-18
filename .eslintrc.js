module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'plugin:eslint-comments/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: ['error', 'never'],
        'eslint-comments/no-unused-vars': 'off',
        'eslint-comments/no-unused-disable': 'off',
        'eslint-comments/disable-line': 'off',
      },
    },
  ],
}
