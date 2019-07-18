var webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './index.js',

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg)$/, loader: 'file-loader' },
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'}
    ]
  },
  devtool: '#source-map',
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    })
  ]
}
