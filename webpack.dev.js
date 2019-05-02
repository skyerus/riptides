const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 80,
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/assets/devIndex.html',
      favicon: 'src/assets/img/favicon-16x16.png',
      minify: true
    }),
  ]
});

