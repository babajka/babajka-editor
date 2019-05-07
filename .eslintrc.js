module.exports = {
  extends: './node_modules/kcd-scripts/eslint.js',
  rules: {
    'no-warning-comments': 'warn',

    'react/prop-types': ['error', { skipUndeclared: true }],
  },
};
