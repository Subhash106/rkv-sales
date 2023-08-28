const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        options: { presets: ['@babel/env'] },
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  resolve: { extensions: ['.*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      inject: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, 'public/_redirects'),
        path.resolve(__dirname, 'public/manifest.json'),
        path.resolve(__dirname, 'public/rkv-service-worker.js'),
        { from: path.resolve(__dirname, 'public/img'), to: path.resolve(__dirname, 'dist/img') }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
