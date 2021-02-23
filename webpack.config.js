'use strict';

const path = require('path');
const nodeExternals = require('webpack-node-externals');

/**@type {import('webpack').Configuration}*/
const config = {
	target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/

	entry: './src/extension.js', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'extension.js',
		libraryTarget: 'commonjs2',
		devtoolModuleFilenameTemplate: '../[resource-path]'
	},
	devtool: 'source-map',
	externals: [{
			vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
		},
		nodeExternals()
	],
	resolve: {
		// support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
		extensions: ['.js']
	},
	module: {
		rules: [{
			exclude: /node_modules/,
		}]
	}
};
module.exports = config;