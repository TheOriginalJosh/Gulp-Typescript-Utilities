var merge = require('merge2');

var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var sourcemaps = require('gulp-sourcemaps');

var ts = require('gulp-typescript');

exports.project = ts.createProject('tsconfig.json', {
	typescript: require('typescript'),
});

exports.compileDebug  = function(source, target, gulp) {
	if (!gulp) {
		gulp = require('gulp');
	}
	
	var result = compile(gulp.src([
		'./typings/**/*.d.ts',
		'./' + source + '/**/*.ts', 
	], { base: source }));

	return merge([
        result.js.pipe(gulp.dest('./' + target)),
        result.dts.pipe(gulp.dest('./' + target + '/typings')),
	]);
};

exports.compileRelease = function(source, target, includeTypings, gulp) {
	if (!gulp) {
		gulp = require('gulp');
	}

	var result = compile(gulp.src([
		'./typings/**/*.d.ts',
		'./' + source + '/**/*.ts',
		'!./' + source + '/**/*.tests.ts',
	]), true);

	if (includeTypings) { 
		return merge([
			result.js.pipe(streamify(uglify()))
			.pipe(gulp.dest('./' + target)),

	        result.dts.pipe(gulp.dest('./' + target + '/typings')),
		]);
	} else {
		return result.js.pipe(streamify(uglify()))
				.pipe(gulp.dest('./' + target));
	}
};

exports.compileTypeDefinitions = function(source, target, gulp) {
	if (!gulp) {
		gulp = require('gulp');
	}

	var result = compile(gulp.src([
		'./typings/**/*.d.ts',
		'./' + source + '/**/*.ts',
		'!./' + source + '/**/*.tests.ts',
	]), true);

	return result.dts.pipe(gulp.dest('./' + target));
};

exports.compile = compile;

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
