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
    semi: [
      2,
      'always'
    ],
    'no-console': 'off'
  }
}
