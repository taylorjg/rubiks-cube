/* eslint-env node */

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { version } = require('./package.json')

const serverPublic = path.join(__dirname, 'server', 'public')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: serverPublic,
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
  devtool: 'source-map',
  devServer: {
    contentBase: serverPublic
  }
}
