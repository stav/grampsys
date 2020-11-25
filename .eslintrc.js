module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2015,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'comma-dangle': ['off'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/attributes-order': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren': [
      'error',
      {
        asyncArrow: 'always',
        anonymous: 'ignore',
        named: 'ignore',
      },
    ],
    'no-irregular-whitespace': [
      'warn',
      {
        skipComments: true,
      },
    ],
  },
}
