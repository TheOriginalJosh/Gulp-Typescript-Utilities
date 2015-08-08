/* global require */

var karma = require('karma').server;

var runSequence = require('run-sequence');
var typescript = require('./typescript');
var copy = require('./copy');
var del = require('del');

var defaults = require('./defaults');

var defaultOptions = {
	locations: defaults.locations(),
	taskNames: {
		test: {
			default: 'test',
			debug: 'test.debug',
			tc: 'test.tc',
			all: 'test.all',
			prep: 'test.prep',
			clean: 'test.clean',
			build: 'test.build',
			copy: 'test.copy',
		}
	}
};

exports.config = function(karmaConfig, options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	runSequence = runSequence.use(gulp);

	options = _.extend(defaultOptions, options);

    gulp.task(options.taskNames.test.default, [options.taskNames.test.prep], function (done) {
    	karma.start({
	    	configFile: karmaConfig,
	    }, done);
    });

    gulp.task(options.taskNames.test.debug, [options.taskNames.test.prep], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		singleRun: false,
    		autoWatch: true,
    		reporters: [],
    	}, done);
    });

    gulp.task(options.taskNames.test.tc, [options.taskNames.test.prep], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    		reporters: ['teamcity'],
    	}, done);
    });

    gulp.task(options.taskNames.test.all, [options.taskNames.test.prep], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    	}, done);
    });

	gulp.task(options.taskNames.test.prep, function(done) {
		runSequence(options.taskNames.test.clean,
					options.taskNames.test.build,
					options.taskNames.test.copy,
					done);
	});

	gulp.task(options.taskNames.test.clean, function(done) {
		del(locationConfig.tests, done);
	});

	gulp.task(options.taskNames.test.build, function() {
		return typescript.compileDebug(locationConfig.source, locationConfig.tests, true, gulp);
	});

	gulp.task(options.taskNames.test.copy, function() {
		return copy('ts', locationConfig.source, locationConfig.tests, gulp);
	});
};