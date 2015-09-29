var webpackTS = require('./ts.config');

var path = require('path');

module.exports = function(entry, libraryName, outDir, outFile, externals) {
	var webpackLibrary = webpackTS();

	webpackLibrary.entry = entry;
	webpackLibrary.output = {
		path: path.resolve(outDir),
		filename: outFile,
		library: libraryName,
		libraryTarget: 'this',
	};
	webpackLibrary.externals = externals;

	return webpackLibrary;
};
