var path = require('path');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './client'
  ],
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx']
  },
  output: {
    path:       path.join(__dirname, 'dist'),
    filename:   'bundle.js',
    publicPath: '/'
  },
 // plugins: [
  // new ExtractTextPlugin('app.css')
 // ],
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      }
     // { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') }
    ]
  },
};
