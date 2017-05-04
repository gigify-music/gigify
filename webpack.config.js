const webpack = require('webpack');
const path = require('path');

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'public');
const cssPath = path.join(__dirname, 'public/Styles');

const config = {
  context: srcPath,
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: 'public/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000000,
        },
      },
      {
        use: [{
          loader: 'babel-loader',
          options: { presets: ['airbnb', 'stage-1'] },
        }],
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }],
  },
};

module.exports = config;

// ,
// options: {
//   includePaths: [cssPath],
// },
