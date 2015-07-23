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

	gulp.task('compile.library', function() {
		return merge([
			typescript.compileDebug(locations.source, locations.library, false, gulp),
			typescript.compileRelease(locations.source, locations.library, false, gulp),
		]);
	});
};