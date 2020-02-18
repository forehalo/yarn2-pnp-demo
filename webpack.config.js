const { cpus } = require('os')
const { resolve } = require('path')
const happypack = require('happypack')
const PnpWebpackPlugin = require('pnp-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: './src/index.tsx',

  devtool: isProduction ? '#@hidden-source-map' : '#@cheap-source-map',

  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    port: 8000,
  },

  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },

  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },

  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'happypack/loader?id=ts',
        include: resolve(__dirname, 'src'),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'index.html'),
    }),
    new happypack({
      id: 'ts',
      loaders: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            happyPackMode: true,
            configFile: resolve(__dirname, 'tsconfig.json'),
            experimentalWatchApi: true,
          },
        },
      ],
    }),
  ],
}
