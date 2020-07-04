/* eslint-env node */

module.exports = {
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    es6: true
  },
  rules: {
    'no-console': 'off'
  }
}
