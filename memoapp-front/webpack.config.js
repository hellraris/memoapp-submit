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
    app: [
            '@babel/polyfill',
            './src/index.js'
    ]
  },
  module: {
    rules:[{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
          useBuiltIns: 'entry',
          targets: {
            browsers: ['> 2%', 'ie >= 11']
          },
          debug: true
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