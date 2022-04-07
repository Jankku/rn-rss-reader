module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:testing-library/react',
  ],
  plugins: ['react', 'react-hooks', 'react-native', 'testing-library', 'jest-dom', 'prettier'],
  parser: '',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules', 'android', '.expo', '.expo-shared', '*.config.js', '__tests__'],
  rules: {
    'react/prop-types': 'off',
    'react-native/no-unused-styles': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
