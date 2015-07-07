module.exports = function() {
	return {
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon'],

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
}