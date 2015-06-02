var runSequence = require('run-sequence');

exports.config = function(gulp) {
	gulp.task('tc', function(done) {
		runSequence('build.release',
					'test.tc',
					done);
	});
};