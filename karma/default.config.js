// Default karma configuration

var _ = require('lodash');

var sharedConfig = require('./shared.config');

var webpackPreprocessorLibrary = 'webpack';

module.exports = function (karma, testFiles, globalFiles, externals) {
	globalFiles = arrayify(globalFiles);
	testFiles = arrayify(testFiles);

	var options = sharedConfig(karma);

	options.files = globalFiles.concat(testFiles);

	_.each(testFiles, function(file) { addPreprocessor(options, file); });

	options.webpack.externals = externals;

	karma.set(options);
	return options;
};


function arrayify(maybeArray) {
	if (_.isArray(maybeArray)) {
		return maybeArray;
	} else if (maybeArray) {
		return [maybeArray];
	} else {
		return [];
	}
}

function addPreprocessor(options, path) {
	options.preprocessors = options.preprocessors || {};
	options.preprocessors[path] = [webpackPreprocessorLibrary];
}
