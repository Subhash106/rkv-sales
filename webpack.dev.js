const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: 'dist',
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  devtool: 'eval',
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
