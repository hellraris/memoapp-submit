const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'memoapp-setting',
  mode: 'development',
  devtool: 'eval',
  devServer: {
    inline:true,
    hot: true,
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/assets/js'
  },
  resolve: {
    extensions: ['.js']
  },
  entry: {
    app: ['./src/index']
  },
  module: {
    rules:[{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
          targets: {
            browsers: ['> 2%']
          },
          debug: false
          }],
          '@babel/preset-react'
        ],
        plugins: []
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug:true })
  ],
  output: {
    path: path.join(__dirname, 'public/assets/js'),
    filename: 'bundle.js'
  }
}