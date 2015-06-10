var lint = require('./lint');
var clean = require('./clean');
var copy = require('./copy');

var runSequence = require('run-sequence');

exports.config = function(gulp, packageName, source, target, useLint) {
	lint.config(gulp, source);
	clean.config(gulp, target);
	compile.config(gulp, packageName, source, target);
	copy.config(gulp, source, target);
	
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