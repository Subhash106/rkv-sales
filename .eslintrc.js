module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {},
  globals: {
    window: true,
    document: true,
    localStorage: true,
    sessionStorage: true,
    __CLIENT__: true,
    __SERVER__: true,
    importScripts: true,
    workbox: true
  }
};
