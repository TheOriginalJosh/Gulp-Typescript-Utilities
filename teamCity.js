var runSequence = require('run-sequence');
var gulp = require('gulp');

exports.config = function(taskName, gulp) {
	if (_.isUndefined(taskName)) {
		taskName = 'tc';
	}

	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	runSequence = runSequence.use(gulp);

	gulp.task('tc', function(done) {
		runSequence('build.release',
					'test.tc',
					done);
	});
};