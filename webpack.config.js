const { join } = require('path')

module.exports = {
  entry: './public/js/src/main.js',
  output: {
    path: join(__dirname, '/public/js/dist/'),
    filename: 'bundle.js'
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
          'presets': [
            'env', 'react', 'stage-0'
          ],
          'plugins': [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
            'transform-react-jsx-source',
          ]
        }
      }
    ]
  },
  watch: true
}
