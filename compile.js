var runSequence = require('run-sequence');

var typescript = require('./typescript');

exports.config = function(gulp, packageName, locations) {
	gulp.task('compile', ['compile.debug']);
	
	gulp.task('compile.debug', function() {
		return typescript.compileDebug(locations.source, locations.debug, false, gulp);
	});
	
	gulp.task('compile.release', function(done) {
		return typescript.compileRelease(locations.source, locations.release, true, gulp);
	});
};