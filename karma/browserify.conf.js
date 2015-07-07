var references = require('../resolve');

var defaults = require('../defaults');
var _ = require('lodash');

var sharedConfig = require('./shared.conf');

// Karma configuration
module.exports = function (karma, depedencies, locations) {
	locations = _.extend(defaults(), locations);
	
	var files = references.getReferences(depedencies, locations.libraries);
	files = files.concat([
		locations.libraries + '/angular-mocks/angular-mocks.js',
		locations.source + '/**/*.tests.ts',
	]);
	
	var config = sharedConfig(karma);
	config.files = files;
	config.frameworks.push('browserify');

	config.browserify = {
		debug: true,
		plugin: [
			['tsify', {
				target: 'ES5',
				removeComments: false,
			}],
		],
	};
	
	config.preprocessors = {};
	config.preprocessors[locations.source + '/**/*.tests.ts'] = ['browserify'];
	
	return config;
};