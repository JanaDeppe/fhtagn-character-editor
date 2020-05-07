/* eslint-disable */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
    config
      .plugin('define')
      .tap(args => {
        const packageJSON = JSON.stringify(require('./package.json'));
        args[0]['process.env'].PACKAGE_JSON = packageJSON;
        return args;
      });
  },
};
