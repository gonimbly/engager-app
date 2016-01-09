'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {
  cache: true,
  debug: false,
  devtool: false,
  output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
  },

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    alias: {
      'styles': __dirname + '/styles',
      'scripts': __dirname + '/scripts/'
    }
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: [
        /node_modules/
      ],
      loader: 'jsxhint-loader'
    }],
    loaders: [
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
         test: /\.(png|jpg|svg)$/,
         loader: 'url-loader'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]

};
