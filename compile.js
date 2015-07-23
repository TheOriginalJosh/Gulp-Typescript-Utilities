var runSequence = require('run-sequence');

var typescript = require('./typescript');

exports.config = function(gulp, packageName, locations) {
	gulp.task('compile', ['compile.debug']);
	
	gulp.task('compile.debug', function() {
		return typescript.compileDebug(locations.source, locations.debug, true, gulp);
	});
	
	gulp.task('compile.release', function(done) {
		return typescript.compileRelease(locations.source, locations.release, false, gulp);
	});

	var merge = require('merge2');

	gulp.task('compile.library', function(done) {
		runSequence('compile.library.debug',
					'compile.library.setOutputMinify',
					'compile.library.release',
					'compile.library.resetOutputMinify',
					done);
	});
	
	gulp.task('compile.library.debug', function() {
		return typescript.compileDebug(locations.source, locations.library, true, gulp);
	});

	var defaultOutput = typescript.project.out;
	
	gulp.task('compile.library.setOutputMinify', function() {
		var match = /(.*)(\.js)/;
		typescript.project.out = defaultOutput.replace(match, '$1.min$2');
	})
	
	gulp.task('compile.library.release', function() {
		return typescript.compileRelease(locations.source, locations.library, false, gulp);
	});
	
	gulp.task('compile.library.resetOutputMinify', function() {
		typescript.project.out = defaultOutput;
	})
};