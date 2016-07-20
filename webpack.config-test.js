var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');
var nodeExternals = require('webpack-node-externals');
var moment = require('moment');

var config = {
  target: 'node',
  output: {
    // sourcemap support for IntelliJ/Webstorm
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  devtool: "cheap-module-source-map", // faster than 'source-map'
  externals: [
    nodeExternals(),
  ],
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
        loader: 'null'
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/),
    new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(vi)$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"test"',
      'process.env.GIT_COMMIT': 'test',
      'process.env.BUILD_TIME': JSON.stringify(moment().format())
    })
  ]
};

module.exports = config;
