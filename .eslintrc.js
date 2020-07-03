module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': ['warn',{
      'code': 150,
      'ignoreStrings': true,
      'ignoreUrls': true,
    }],
    'indent': ['warn', 2],
    'no-shadow': [
      'error',
      {'allow': [ 'state', 'getters' ]}
    ],
    'no-param-reassign': [
      'error',
      {
        'props': true,
        'ignorePropertyModificationsFor': ['state', 'context']
      }
    ],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "arrow-parens": ["error", "as-needed"],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
