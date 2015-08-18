var gulp = require('gulp');
var _ = require('lodash');

exports.config = function(taskName, gulp) {
	if (_.isUndefined(taskName)) {
		taskName = 'tc';
	}

	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	var runSequence = require('run-sequence').use(gulp);

	gulp.task(taskName, function(done) {
		runSequence('build.release',
					'test.tc',
					done);
	});
};