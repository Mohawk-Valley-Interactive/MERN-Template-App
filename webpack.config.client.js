const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const CURRENT_WORKING_DIR = process.cwd();

const config = {
  name: "browser",
  mode: "development",
  devtool: "source-map",
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(CURRENT_WORKING_DIR, 'client/main.js')
  ],
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [ 
              require.resolve('react-refresh/babel')
            ]
          }
        }
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
        use: 'file-loader'
      }
    ]
  },
  optimization: {
    noEmitOnErrors: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm'
      }
    })
  ]
};

module.exports = config;