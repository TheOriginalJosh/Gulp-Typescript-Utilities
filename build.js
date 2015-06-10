var lint = require('./lint');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');

var runSequence = require('run-sequence');

exports.config = function(gulp, packageName, source, debugTarget, releaseTarget, useLint) {
	lint.config(gulp, source);
	clean.config(gulp, debugTarget, releaseTarget);
	compile.config(gulp, packageName, source, debugTarget, releaseTarget);
	copy.config(gulp, source, debugTarget, releaseTarget);
	
	gulp.task('build', ['build.debug']);

	gulp.task('build.debug', function(done) {
		if (useLint) {
			runSequence('lint',
						'clean.debug',
						'compile.debug',
						'copy.debug',
						done);
		} else {
			runSequence('clean.debug',
						'compile.debug',
						'copy.debug',
						done);
		}
	});

	gulp.task('build.release', function(done) {
		if (useLint) {
			runSequence('lint',
						'clean.release',
						'compile.release',
						'copy.release',
						done);
		} else {
			runSequence('clean.release',
						'compile.release',
						'copy.release',
						done);
		}
	});
};