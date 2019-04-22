const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const DotEnv = require('dotenv')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'API_URL': JSON.stringify(process.env.API_URL),
        'CHAT_SOCKET_URL': JSON.stringify(process.env.CHAT_SOCKET_URL),
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'SPOTIFY_AUTHORIZE_URL': JSON.stringify(process.env.SPOTIFY_AUTHORIZE_URL)
      }
    })
  ]
});