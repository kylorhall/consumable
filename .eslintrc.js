const path = require('path');

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'standard',
    'react',
  ],
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      impliedStrict: true,
      classes: true,
      jsx: true,
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'import/no-unresolved': 'off', // not compatible with parcel ~/ resolves
    'max-len': ['warn', 140],
    'prefer-destructuring': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    semi: ['error', 'always'],
    'import/no-extraneous-dependencies': ["error", { devDependencies: true }], // allow prop-types

    // because eslint v5 + airbnb isn't so nice right now..
    'react/destructuring-assignment': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': 'off',
  },
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
    ],
    'import/resolver': {
      node: {
        paths: [
          path.resolve(__dirname, './src'),
          path.resolve(__dirname, './assets'),
          path.resolve(__dirname, './node_modules'),
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
}
