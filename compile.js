var runSequence = require('run-sequence');

var typescript = require('./typescript');
var requirejs = require('./requirejs');

exports.config = function(gulp, packageName, locations) {
	requirejs.config(gulp, packageName, locations);
	
	gulp.task('compile', ['compile.debug']);
	
	gulp.task('compile.debug', function() {
		return typescript.compileDebug('**/*.ts', locations.source, locations.debug);
	});
	
	gulp.task('compile.release', function(done) {
		runSequence('compile.release.bin',
					'compile.release.optimize',
					'compile.release.clean',
					done);
	});
};