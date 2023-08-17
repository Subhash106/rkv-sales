const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: 'dist',
    port: 3000
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
