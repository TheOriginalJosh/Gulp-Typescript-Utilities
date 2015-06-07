var gulp = require('gulp');

var merge = require('merge2');

var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');

var ts = require('gulp-typescript');

exports.project = ts.createProject('tsconfig.json');

exports.compileDebug  = function(path, source, target) {
	var result = compile(gulp.src([
		'./typings/**/*.d.ts',
		'./' + source + '/' + path, 
	]));

	return merge([
        result.js.pipe(gulp.dest('./' + target)),
        result.dts.pipe(gulp.dest('./' + target + '/typings')),
	]);
};

exports.compileRelease = function(path, source, target) {
	var result = compile(gulp.src([
		'./typings/**/*.d.ts',
		'./' + source + '/' + path, 
	]), true);

	return result.js.pipe(streamify(uglify()))
		.pipe(gulp.dest('./' + target));
};

exports.compileTypeDefinitions = function(path, source, target) {
	var result = compile(gulp.src([
		'./' + source + '/' + path, 
		'./typings/**/*.d.ts'
	]), true);

	return result.dts.pipe(gulp.dest('./' + target));
};

function compile(source, noSourceMappings) {
	var typescriptCompiler = ts(exports.project);
	
	if (noSourceMappings) {
		return source.pipe(typescriptCompiler);
	} else {
		var tsResult = source.pipe(sourcemaps.init({ debug: true }))
			.pipe(typescriptCompiler);

		return {
			js: tsResult.js.pipe(sourcemaps.write()),
			dts: tsResult.dts,
		};
	}
}
