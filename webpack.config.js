/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { version } = require('./package.json')

const BUILD_FOLDER = path.join(__dirname, 'build')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: BUILD_FOLDER,
    filename: 'bundle.js',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { context: './src', from: '*.html' },
        { context: './src', from: '*.css' },
        { context: './src', from: '*.png' },
        { context: './src', from: '*.json' },
        { context: './src', from: '*.glb' },
        { context: './src', from: '*.gltf' },
        { context: './src', from: 'service-worker.js' }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      version
    })
  ],
  devtool: 'source-map'
}
