var runSequence = require('run-sequence');

exports.config = function(gulp) {
	runSequence = runSequence.use(gulp);

	gulp.task('tc', function(done) {
		runSequence('build.release',
					'test.tc',
					done);
	});
};