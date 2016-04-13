// Default karma configuration

var _ = require('lodash');

var sharedConfig = require('./shared.config');

var webpackPreprocessorLibrary = 'webpack';

module.exports = function (karma, globalFiles, testFiles) {
	globalFiles = arrayify(globalFiles);
	testFiles = arrayify(testFiles);

	var options = sharedConfig(karma);

	options.files = globalFiles.concat(testFiles);

	_.each(testFiles, function(file) { addPreprocessor(options, file); });

	karma.set(options);
	return options;
};


function arrayify(maybeArray) {
	if (_.isArray(maybeArray)) {
		return maybeArray;
	}

	return [maybeArray];
}

function addPreprocessor(options, path) {
	options.preprocessors = options.preprocessors || {};
	options.preprocessors[path] = [webpackPreprocessorLibrary];
}
