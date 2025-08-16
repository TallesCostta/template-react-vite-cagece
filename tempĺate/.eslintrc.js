module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['**/__tests__/**'],
  plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'import', 'react-hooks', 'prettier'],
  rules: {
    'react/prop-types': ['off'],
    'import/extensions': ['error', {ts: 'never', tsx: 'never', json: 'always'}],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    'react/function-component-definition': [
      0,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'react/jsx-one-expression-per-line': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': [
      'error',
      {
        custom: 'ignore',
      },
    ],
    camelcase: 'off',
    'no-console': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'max-lines': ['warn', {max: 350, skipComments: true}],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
