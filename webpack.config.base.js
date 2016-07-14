'use strict';

var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
    }],
  },
  output: {
    library: 'GeneralStoreCRUD',
    libraryTarget: 'umd',
    sourcePrefix: '  ',
  },
  resolve: {
    extensions: ['', '.js'],
  },
};
