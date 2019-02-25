const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader:  'babel-loader'
          }
        },
      ]
    },
    plugins: [cleanDist, htmlPlugin]
 }
}