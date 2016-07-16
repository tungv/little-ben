var webpack = require('webpack');

module.exports = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: __dirname + '/dist/js/',
    filename: 'bundle.js',
    publicPath: '/js/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel',
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&camelCase&-import&localIdentName=[path][name]---[local]---[hash:base64:5]'
        ]
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(vi)$/)
  ]
};
