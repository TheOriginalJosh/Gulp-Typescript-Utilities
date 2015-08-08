/* global require */

var karma = require('karma').server;
var _ = require('lodash');

var runSequence = require('run-sequence');
var typescript = require('./typescript');
var copy = require('./copy');
var del = require('del');

var defaults = require('./defaults');

var defaultOptions = {
	locations: defaults.locations(),
	taskNames: {
		test: {
			base: 'test',
			debug: 'debug',
			tc: 'tc',
			all: 'all',
			prep: 'prep',
			clean: 'clean',
			build: 'build',
			copy: 'copy',
		}
	}
};

exports.config = function(karmaConfig, options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	runSequence = runSequence.use(gulp);

	options = _.assign(defaultOptions, options);

	var testNames = options.taskNames.test;
	var prepName = testNames.base + '.' + testNames.prep

    gulp.task(testNames.base, [prepName], function (done) {
    	karma.start({
	    	configFile: karmaConfig,
	    }, done);
    });

    gulp.task(options.taskNames.test.debug, [prepName], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		singleRun: false,
    		autoWatch: true,
    		reporters: [],
    	}, done);
    });

    gulp.task(options.taskNames.test.tc, [prepName], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    		reporters: ['teamcity'],
    	}, done);
    });

    gulp.task(options.taskNames.test.all, [prepName], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    	}, done);
    });

	var cleanName = testNames.base + '.' + testNames.clean;
	var buildName = testNames.base + '.' + testNames.build;
	var copyName = testNames.base + '.' + testNames.copy;

	gulp.task(prepName, function(done) {
		runSequence(cleanName,
					buildName,
					copyName,
					done);
	});

	gulp.task(cleanName, function(done) {
		del(options.locations.tests, done);
	});

	gulp.task(buildName, function() {
		return typescript.compileDebug(options.locations.source, options.locations.tests, true, gulp);
	});

	gulp.task(copyName, function() {
		return copy('ts', options.locations.source, options.locations.tests, gulp);
	});
};