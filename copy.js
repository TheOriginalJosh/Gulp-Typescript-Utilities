var merge = require('merge2');
var _ = require('lodash');

function copy(extensions, source, target, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}
	
	var paths; 

	if (!_.isArray(extensions)) {
		if (_.isString()) {
			extensions = [extensions];
		} else {
			extensions = ['*'];
		}
	}

	paths = _.map(extensions, function(ext) {
		return './' + source + '/**/*.' + ext;
	});

	return gulp.src(paths).pipe(gulp.dest('./' + target));
}

module.exports = copy;

module.exports.copyBowerDefinition = function(target, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}
	
	return gulp.src('./bower.json').pipe(gulp.dest('./' + target));
}

function copyDebug(source, assets, libraries, destination, includeLibraries, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	var copyStreams = [
		copy(['json', 'ts', 'js', 'html', 'css'], source, destination, gulp),
		copy('*', assets, destination + '/' + assets, gulp),
		copy.copyBowerDefinition(destination, gulp),
	];

	if (includeLibraries) {
		var libraryCopy = copy('*', libraries, destination + '/' + libraries, gulp);
		copyStreams.push(libraryCopy);
	}

	return merge(copyStreams);
}

function copyRelease(source, assets, libraries, destination, includeLibraries, gulp) {
	var copyStreams = [
		copy(['json', 'js', 'html', 'css'], source, destination, gulp),
		copy('*', assets, destination + '/' + assets, gulp),
		copy.copyBowerDefinition(destination, gulp),
	];

	if (includeLibraries) {
		var libraryCopy = copy('*', libraries, destination + '/' + libraries, gulp); 
		copyStreams.push(libraryCopy);
	}

	return merge(copyStreams);
}

module.exports.config = function (gulp, locations, includeLibraries) {
	gulp.task('copy', ['copy.debug']);

	gulp.task('copy.debug', function () {
		return copyDebug(locations.source, locations.assets, locations.libraries, locations.debug, includeLibraries, gulp);
	});
	
	gulp.task('copy.release', function () {
		return copyRelease(locations.source, locations.assets, locations.libraries, locations.release, includeLibraries, gulp);
	});
	
	gulp.task('copy.library', function() {
		return copyDebug(locations.source, locations.assets, locations.libraries, locations.library, includeLibraries, gulp);
	});
};
