var Webpack = require('webpack');
var Path = require('path');
var Html = require('html-webpack-plugin');
var ExtractText = require('extract-text-webpack-plugin');
var Copy = require('copy-webpack-plugin');

var config = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: Path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].bundle.js'
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractText.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
        publicPath: './dist'
      })
    }]
  },

  plugins: [
    new Html({
      minify: {
        collapseWhitespace: true
      },
      template: './src/index.html'
    }),

    new ExtractText({
      filename: '[name].[contenthash].bundle.css',
      disable: false,
      allChunks: true
    }),

    new Copy([{
      from: 'src/favicon.ico'
    }, {
      context: 'src/images',
      from: '**/*',
      to: 'images'
    }])
  ],

  devServer: {
    contentBase: Path.join(__dirname, 'dist'),
    compress: true,
    port: 5000,
    stats: 'errors-only',
    open: false
  }

};

module.exports = config;
