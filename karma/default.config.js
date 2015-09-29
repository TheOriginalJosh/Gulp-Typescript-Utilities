// Default karma configuration

var _ = require('lodash');

var sharedConfig = require('./shared.config');
var karmaWebpack = require('../webpack/karma.config');

var karmaWebpackLibrary = 'karma-webpack';
var webpackPreprocessorLibrary = 'webpack';

module.exports = function (karma, files) {
	var options = sharedConfig(karma);
	options.files = files;

	if (_.isArray(files)) {
		_.each(files, function(file) { addPreprocessor(options, file); });
	} else if (files) {
		addPreprocessor(options, files);
	}

	options.webpack = karmaWebpack();

	options.plugins = options.plugins || [];
	options.plugins.push(karmaWebpackLibrary);

	karma.set(options);
	return options;
};


function addPreprocessor(options, path) {
	options.preprocessors = options.preprocessors || {};
	options.preprocessors[path] = [webpackPreprocessorLibrary];
}
