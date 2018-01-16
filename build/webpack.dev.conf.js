var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('2.0.1'),
      APP_URL:  JSON.stringify('http://localhost:8080'),
      API_ASSET_URI: JSON.stringify('http://localhost:8000/storage'),
      API_BASE_URI:  JSON.stringify('http://localhost:8000'),
      API_URI:  JSON.stringify('http://localhost:8000/api'),
      FB_APP_ID:  JSON.stringify('2211517428989297')
      // Credentials for lddw server
      // CLIENT_ID: JSON.stringify('5'),
      // CLIENT_SECRET: JSON.stringify('0jDrJ3e5osD9gCQ6eT4yyHmK4eQiYnINvQ0RE6Xx')
      // https://preprod.ladechetterieduweb.com
      // CLIENT_ID: JSON.stringify('2'),
      // CLIENT_SECRET: JSON.stringify('wG29QeVFgYlHBUlX7FPMfVbgD7rulPormKYz91Vr')
    }) 
  ]
})
