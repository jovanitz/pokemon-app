const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';

const htmlPlugin =  new HtmlWebPackPlugin({
  template: require('html-webpack-template'),
  appMountId: 'index'
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
        views: path.resolve('src/containers'),
        styles: path.resolve('src/styles'),
        components: path.resolve('src/components'),
        hoc: path.resolve('src/hoc'),
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