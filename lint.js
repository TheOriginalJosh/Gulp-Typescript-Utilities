var tslint = require('gulp-tslint');

function lint(source, gulp) {
	if (!gulp) {
		gulp = require('gulp');
	}
	
	gulp.src(['./' + source + '/**/*.ts', '!./source/typings/*.d.ts'])
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
}

module.exports = lint;

module.exports.config = function(gulp, locations) {
    gulp.task('lint', function() {
		lint(locations.source, gulp);
    });
};