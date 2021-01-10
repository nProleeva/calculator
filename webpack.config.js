const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
        main: path.resolve(__dirname, './jsx/script.jsx'),
    },
	mode: 'development',
	output: {
		path: path.resolve(__dirname, './'),
		filename: 'bundle.js'
	},
	devtool: 'inline-source-map',
	devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.s[ac]ss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	plugins: [
	new HtmlWebpackPlugin({
      filename: './index.html',
      template: 'index.html',
      inject: 'head',
      alwaysWriteToDisk: true
    }),
    new webpack.HotModuleReplacementPlugin()]
}