/* global require */

var karma = require('karma').server;

exports.config = function(gulp, karmaConfig, locationConfig) {
    gulp.task('test', ['test.prep'], function (done) {
    	karma.start({
	    	configFile: karmaConfig,
	    }, done);
    });

    gulp.task('test.debug', ['test.prep'], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		singleRun: false,
    		autoWatch: true,
    		reporters: [],
    	}, done);
    });

    gulp.task('test.tc', ['test.prep'], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    		reporters: ['teamcity'],
    	}, done);
    });

    gulp.task('test.all', ['test.prep'], function (done) {
    	karma.start({
    		configFile: karmaConfig,
    		browsers: ['Chrome', 'Firefox', 'IE'],
    	}, done);
    });

	var runSequence = require('run-sequence').use(gulp);
	var typescript = require('./typescript');
	var copy = require('./copy');
	var del = require('del');

	gulp.task('test.prep', function(done) {
		runSequence('test.clean',
					'test.build',
					'test.copy',
					done);
	});

	gulp.task('test.clean', function(done) {
		del(locationConfig.tests, done);
	});

	gulp.task('test.build', function() {
		return typescript.compileDebug(locationConfig.source, locationConfig.tests, true, gulp);
	});

	gulp.task('test.copy', function() {
		return copy('ts', locationConfig.source, locationConfig.tests, gulp);
	});
};