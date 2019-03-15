const { jest: jestConfig } = require('kcd-scripts/config');

module.exports = Object.assign(jestConfig, {
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
});
