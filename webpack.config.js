'use strict'
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var webpack = require('webpack');
require('es6-promise').polyfill()

module.exports = {
	context:  __dirname + '\\app',
  	entry: './scripts/main',
  
  	output: {
    	filename: 'bundle.js',
    	path: __dirname + '\\views'
	},

	module : {
		loaders: [
		{
	      test: /\.jsx?$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: ['babel'], // 'babel-loader' is also a legal name to reference
	      query: {
	        presets: ['react'], 
	      }
	    },
    // SASS
      	{
		    test: /\.scss$/,
		    exclude: /node_modules/,
		   loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
		},
    	
	      { test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
         loader: 'url?limit=100000&name=[path][name].[ext]?[hash]'

    	},

    	{test:/\.(json)$/, loader:'file?name=[path][name].[ext]'},
   
		]
	},
	plugins: [
	 	new webpack.NoErrorsPlugin(),
		new ExtractTextPlugin('styles.css', {allChunks: true, disable: process.env.NODE_ENV=='development'}),
		new CopyWebpackPlugin([
			{ from:  './locales', to:  'locales' },
		
			]),
	],
//   stats: {
//   // Config for minimal console.log mess.
//   assets: false,
//   colors: true,
//   version: false,
//   hash: false,
//   timings: true,
//   chunks: false,
//   chunkModules: false
// },

	devServer: {
		host:'localhost',
		port:9000,
		contentBase: __dirname + '\\views',
    lazy: false,
	}

}