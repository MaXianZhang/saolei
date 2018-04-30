var path = require('path');
var webpack = require('webpack');

module.exports = {

  entry: "./www/static/js/App.jsx",

  output: {
    path: path.join(__dirname, '/www/static/js/'),
    filename: 'bundle.js'
  },
  devtool: "source-map",
  mode: 'development',

  module: {
    rules: [
      {
        test: /.jsx$/, //使用loader的目标文件。这里是.jsx
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] }
      },
      {
        test: /.(js)$/, //使用loader的目标文件。这里是.js
        loader: 'babel-loader',
        exclude: [
          path.join(__dirname, './node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
        ]
      }
    ]
  }

}