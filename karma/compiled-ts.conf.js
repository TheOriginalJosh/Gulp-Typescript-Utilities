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
		locations.tests + '/**/*.js',
	]);
	
	var config = sharedConfig(karma);
	config.files = files;
	
	return config;
};