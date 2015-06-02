var lint = require('./lint');
var clean = require('./clean');
var copy = require('./copy');

var runSequence = require('run-sequence');

module.exports = function(gulp, debugTask, releaseTask) {
	lint.config(gulp);
	clean.config(gulp);
	copy.config(gulp);
	
	gulp.task('build', ['build.debug']);

	gulp.task('build.debug', function(done) {
		runSequence('lint',
					'clean.debug',
					debugTask,
					'copy.debug',
					done);
	});

	gulp.task('build.release', function(done) {
		runSequence('lint',
					'clean.release',
					releaseTask,
					'copy.release',
					done);
	});
};