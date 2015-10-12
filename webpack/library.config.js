var webpackTS = require('./ts.config');

module.exports = function(options) {
	var webpackLibrary = webpackTS();

	webpackLibrary.entry = options.entry;
	webpackLibrary.output = {
		path: options.path,
		publicPath: options.publicPath || options.path,
		filename: options.filename,
		library: options.library,
		libraryTarget: 'this',
	};
	webpackLibrary.externals = options.externals;

	return webpackLibrary;
};
