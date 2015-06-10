var references = require('./resolve');

var defaults = require('./defaults');
var _ = require('lodash');

// Karma configuration
module.exports = function (karma, depedencies, locations) {
	locations = _.extend(defaults(), locations);
	
	var files = references.getReferences(depedencies);
	files = files.concat([
		locations.libraries + '/angular-mocks/angular-mocks.js',
		locations.source + '/**/*.tests.ts',
	]);

	var config = {
		// list of files / patterns to load in the browser
		// Files are loaded in order, so items listed first are sometimes required by items below
		files: files,

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['browserify', 'mocha', 'chai', 'sinon'],

		browserify: {
			debug: true,
			plugin: [
				['tsify', {
					target: 'ES5',
					removeComments: false,
				}],
			],
		},

        // enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

        // Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// level of logging
		// possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
		logLevel: karma.LOG_INFO,
        
		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        
		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],
        
		// enable / disable colors in the output (reporters and logs)
		colors: true,
	};
	
	config.preprocessors = {};
	config.preprocessors[locations.source + 'source/**/*.tests.ts'] = ['browserify'];
	
	return config;
};

//		htmlReporter: {
//			'outputFile': 'testResults.html',
//		},
