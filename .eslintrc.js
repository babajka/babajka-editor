module.exports = {
  extends: './node_modules/kcd-scripts/eslint.js',
  rules: {
    'react/prop-types': ['error', { skipUndeclared: true }],
  },
};
