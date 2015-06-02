var runSequence = require('run-sequence');

module.exports = function(gulp) {
	gulp.task('tc', function(done) {
		runSequence('build.release',
					'test.tc',
					done);
	});
};