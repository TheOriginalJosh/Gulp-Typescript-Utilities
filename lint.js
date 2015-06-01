var gulp = require('gulp');

var tslint = require('gulp-tslint');

function lint(source) {
	gulp.src(['./' + source + '/**/*.ts', '!./source/typings/*.d.ts'])
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
}

module.exports = lint;

var defaults = require('./defaults');

module.exports.config = function(gulp) {
    gulp.task('lint', function() {
		lint(defaults.sourceFolder);
    });
};