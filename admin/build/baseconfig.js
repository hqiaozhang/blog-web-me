const path = require('path');

module.exports = {
  dev: {
    host: 'localhost',
    port: 8086,
    proxyTable: {
      '/backend': {
        target: 'http://localhost:3000', // 开发环境
        changeOrigin: true, //如果接口跨域，需要进行这个参数配置
        secure: false, // 如果是https接口，需要配置这个参数
      }
    },
    useEslint: false,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    showEslintErrorsInOverlay: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    devtool: 'cheap-module-eval-source-map',
    poll: false,
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    bundleAnalyzerReport: false,
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
};
