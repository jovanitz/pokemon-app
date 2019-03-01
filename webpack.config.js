const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin =  new HtmlWebPackPlugin({
  template: require('html-webpack-template'),
  appMountId: 'index',
  inject: false,
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0'
    }
  ]
});

const cleanDist = new CleanWebpackPlugin(['dist/*']);

module.exports  = () => {
  return {
    devServer: {
      port: 3000
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      cleanDist,
      htmlPlugin,
    ],
    resolve: {
      alias: {
        containers: path.resolve('src/containers'),
        helpers: path.resolve('src/helpers'),
        styles: path.resolve('src/styles'),
        components: path.resolve('src/components'),
        hoc: path.resolve('src/hoc'),
        state: path.resolve('src/state'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader:  'babel-loader'
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
      ]
    },
 }
}