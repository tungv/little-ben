var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');

var DEBUG = process.env.NODE_ENV !== 'production';

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
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(vi)$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    !DEBUG && new ClosureCompilerPlugin()
  ]
};
