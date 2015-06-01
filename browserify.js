var gulp = require('gulp');

var browserify = require('browserify');
var tsify = require('tsify');

var sourceStream = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');

var typescript = require('./typescript');

var defaults = require('./defaults');

exports.compileDebug = function (filename, source, target) {
	if (!source) {
		source = defaults.sourceFolder;
	}
	
	if (!target) {
		target = defaults.debugFolder;
	}
		
	var bundler = browserify({ debug: true })
		.add('./' + source + '/' + filename + '.ts')
		.plugin(tsify, {
			target: 'ES5',
			removeComments: false,
		});

	return bundler.bundle()
		.pipe(sourceStream(filename + '.js'))
		.pipe(gulp.dest('./' + target));
};

exports.compileRelease = function(filename, source, target) {
	if (!source) {
		source = defaults.sourceFolder;
	}
	
	if (!target) {
		target = defaults.releaseFolder;
	}
	
	var bundler = browserify()
		.add('./' + source + '/' + filename + '.ts')
		.plugin(tsify, {
			target: 'ES5',
			removeComments: true,
		});

	return bundler.bundle()
		.pipe(sourceStream(filename + '.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest('./' + target));
};
