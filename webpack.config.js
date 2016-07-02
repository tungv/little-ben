console.log(__dirname + '/dist/js/');

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
        loaders: [
          'babel',
        ]
      }
    ]
  }
};
