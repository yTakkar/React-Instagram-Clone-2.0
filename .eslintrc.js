module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:prettier/recommended',
  ],
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2017,
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true
    },
    'sourceType': 'module'
  },
  'globals': {
    'describe': true,
    'test': true,
    'it': true,
    'expect': true,
    'beforeAll': true,
    'afterAll': true,
    'beforeEach': true,
    'afterEach': true,
    'jest': true
  },
  'plugins': [ 'react' ],
  'rules': {
    'semi': [
      'error',
      'never'
    ],
    'no-unused-vars': [
      'error',
      { 'varsIgnorePattern': 'React' }
    ],
    'no-console': 'off',
    'no-ternary': 0,
    'no-nested-ternary': 0,
    'multiline-ternary': 0,
    'react/jsx-uses-vars': 1,
    'prettier/prettier': [
      'error', {
        singleQuote: true,
        semi: false,
        trailingComma: 'es5'
      }
    ]
  }
}
