var lint = require('./lint');
var clean = require('./clean');
var copy = require('./copy');

var runSequence = require('run-sequence');

exports.config = function(gulp, debugTask, releaseTask, useLint) {
	lint.config(gulp);
	clean.config(gulp);
	copy.config(gulp);
	
	gulp.task('build', ['build.debug']);

	gulp.task('build.debug', function(done) {
		if (useLint) {
			runSequence('lint',
						'clean.debug',
						debugTask,
						'copy.debug',
						done);
		} else {
			runSequence('clean.debug',
						debugTask,
						'copy.debug',
						done);
		}
	});

	gulp.task('build.release', function(done) {
		if (useLint) {
			runSequence('lint',
						'clean.release',
						releaseTask,
						'copy.release',
						done);
		} else {
			runSequence('clean.release',
						releaseTask,
						'copy.release',
						done);
		}
	});
};