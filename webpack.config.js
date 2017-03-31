const path = require('path');
const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'public');

const config = {
  context: srcPath,
  entry: path.join(__dirname, '/src/index.jsx'),
  output: {
    path: buildPath,
    firename: 'bundle.js',
    publicPath: 'build/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    [
      {
        use: [{
          loader: 'babel-loader',
          options: { presets: ['airbnb', 'stage-1']},
        }],
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
    ],
  },
};

module.exports = config;
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules)/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['react', 'es2015']
//         }
//       }
//     ]
//   }
// };
