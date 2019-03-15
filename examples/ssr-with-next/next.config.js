const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: config => {
    // enable transpile for `../../../src/index.js`
    // only for development
    // https://github.com/zeit/next.js/issues/5666
    config.module.rules.forEach(rule => {
      if (rule.use && rule.use.loader === 'next-babel-loader') {
        rule.include = undefined;
      }
    });
    return config;
  },
});
