/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { version } = require('./package.json')

const BUILD_FOLDER = path.join(__dirname, 'build')

module.exports = {
  mode: 'production',
  entry: {
    'bundle': './src/index.js',
    'service-worker': './src/service-worker.js'
  },
  output: {
    path: BUILD_FOLDER,
    filename: '[name].js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { context: './src', from: '*.html' },
        { context: './src', from: '*.css' },
        { context: './src', from: '*.png' },
        { context: './src', from: '*.json' },
        { context: './src', from: '*.glb' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      version
    })
  ],
  devtool: 'source-map'
}
