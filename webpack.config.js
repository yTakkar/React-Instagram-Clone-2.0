const { join } = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
  entry: './src/main.js',
  output: {
    path: join(__dirname, '/dist/js/'),
    filename: 'bundle.js',
  },
  mode: 'development',
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
            'transform-react-jsx-source',
          ],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
    }),
  ],
  watch: true,
}
