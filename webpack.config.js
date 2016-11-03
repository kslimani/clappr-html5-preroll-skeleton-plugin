var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');

var plugins = [
  new Clean(['dist'])
];

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  plugins: plugins,
  externals: {
    clappr: 'Clappr',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            compact: true,
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.sass$/,
        loaders: ['css', 'sass?includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib")],
      },
      {
        test: /\.svg/,
        loader: 'svg-inline'
      },
    ],
  },
  resolve: {
    extensions: ['', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'clappr-html5-preroll-plugin.js',
    library: 'ClapprHtml5PrerollPlugin',
    libraryTarget: 'umd',
  },
};
