var webpack = require('webpack');
var webpackLibrary = require('./library.config');

module.exports = function(options) {
	var webpackLibraryMin = webpackLibrary(options);

	webpackLibraryMin.output.filename = webpackLibraryMin.output.filename.replace(/\.js$/, '.min.js');

	var minify = new webpack.optimize.UglifyJsPlugin({ minimize: true });

	webpackLibraryMin.plugins = webpackLibraryMin.plugins || [];
	webpackLibraryMin.plugins.push(minify);

	return webpackLibraryMin;
};
