var gulp = require('gulp');

var merge = require('merge2');

var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');

var ts = require('gulp-typescript');

exports.config = {
	declarationFiles: true,
	noExternalResolve: false,
	module: 'commonjs',
	target: 'ES5',
	sortOutput: true,
};

exports.compileDebug  = function(path, source, target) {
	var result = compile(gulp.src([
		'./' + source + '/' + path, 
		'./typings/**/*.d.ts'
	]));

	return merge([
        result.js.pipe(gulp.dest('./' + target)),
        result.dts.pipe(gulp.dest('./' + target + '/typings')),
	]);
};

exports.compileRelease = function(path, source, target) {
	var result = compile(gulp.src([
		'./' + source + '/' + path, 
		'./typings/**/*.d.ts'
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
	var typescriptCompiler = ts(exports.config);
	
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
