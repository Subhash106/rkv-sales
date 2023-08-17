const path = require('path');

module.exports = {
  entry: './public/sw-base.js',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'rkv-service-worker.js'
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|mjs)$/,
            include: /public/,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
};
