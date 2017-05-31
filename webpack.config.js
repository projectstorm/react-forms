var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackNotifierPlugin = require('webpack-notifier');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var LiveReloadPlugin = require('webpack-livereload-plugin');

var plugins = [];

//do we minify it all
if(process.env.NODE_ENV === 'production'){
	console.log("creating production build");
	new CheckerPlugin(),
	plugins.push(new webpack.optimize.UglifyJsPlugin({
		mangle: {
			keep_fnames: true
		},
		compress: {
			keep_fnames: true,
			warnings: false,
		}
	}));
	plugins.push(new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify('production')
	}));
}

/**
 * @author Dylan Vorster
 */
module.exports = [
	//for building the umd distribution
	{
		entry: './src/main.ts',
		output: {
			filename: 'main.js',
			path: __dirname + '/dist',
			libraryTarget: 'umd',
			library: 'SRF'
		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react'
			},
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom'
			},
			"lodash": {
				commonjs: 'lodash',
				commonjs2: 'lodash',
				amd: '_',
				root: '_'
			},
			"prop-types":{
				commonjs:'prop-types',
				commonjs2:'prop-types',
				amd: 'PropTypes',
				root: 'PropTypes'
			}
		},
		plugins:plugins,
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader']
					})
				},
				{
					test: /\.tsx?$/,
					loader: 'awesome-typescript-loader'
				},
			]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		devtool: process.env.NODE_ENV === 'production'?false:'cheap-module-source-map'
	},

	//for building the demos and tests
	{
		entry: {
			'demo1/min/bundle.min': './demos/demo1/index.ts',
		},
		output: {
			filename: '[name].js',
			path: __dirname + '/demos',
			libraryTarget: 'umd',
			library: 'storm-react-forms'
		},
		plugins:plugins.concat([
			new WebpackNotifierPlugin({alwaysNotify: true}),
			new ExtractTextPlugin({filename:'[name].css'}),
			new LiveReloadPlugin({port: 35729})
		]),
		module: {
			rules: [
				{
					test: /\.scss$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'sass-loader']
					})
				},
				{
					enforce: 'pre',
					test: /\.js$/,
					loader: "source-map-loader"
				},
				{
					test: /\.tsx?$/,
					loader: 'awesome-typescript-loader'
				},
			]
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"]
		},
		devtool: process.env.NODE_ENV === 'production'?false:'cheap-module-source-map'
	}
];
