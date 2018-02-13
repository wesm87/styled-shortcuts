module.exports = {
  extends: 'airbnb',
  env: {
    jest: true,
    node: true,
    browser: true,
  },
  rules: {
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
  },
};
