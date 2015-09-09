var merge = require('merge2');
var _ = require('lodash');

var defaults = require('./defaults');

function copyImplementation(extensions, source, target, gulp) {
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

function copyBowerDefinitionImplementation(target, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	return gulp.src('./bower.json').pipe(gulp.dest('./' + target));
}

module.exports = copyImplementation;
module.exports.copyBowerDefinition = copyBowerDefinitionImplementation;

function copyDebug(source, assets, libraries, destination, includeLibraries, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	var copyStreams = [
		copyImplementation(['json', 'ts', 'js', 'html', 'css'], source, destination, gulp),
		copyImplementation('*', assets, destination + '/' + assets, gulp),
		copyBowerDefinitionImplementation(destination, gulp),
	];

	if (includeLibraries) {
		var libraryCopy = copyImplementation('*', libraries, destination + '/' + libraries, gulp);
		copyStreams.push(libraryCopy);
	}

	return merge(copyStreams);
}

function copyRelease(source, assets, libraries, destination, includeLibraries, gulp) {
	var copyStreams = [
		copyImplementation(['json', 'js', 'html', 'css'], source, destination, gulp),
		copyImplementation('*', assets, destination + '/' + assets, gulp),
		copyImplementation.copyBowerDefinition(destination, gulp),
	];

	if (includeLibraries) {
		var libraryCopy = copyImplementation('*', libraries, destination + '/' + libraries, gulp);
		copyStreams.push(libraryCopy);
	}

	return merge(copyStreams);
}

var defaultOptions = {
	locations: defaults.locations(),
	includeLibraries: true,
	taskNames: {
		copy: 'copy',
		debug: 'debug',
		release: 'release',
		library: 'library',
	},
};

module.exports.config = function (options, gulp) {
	if(_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	options = _.defaultsDeep(options, defaultOptions);

	var taskNames = options.taskNames;

	gulp.task(taskNames.copy + '.' + taskNames.debug, function () {
		return copyDebug(options.locations.source, options.locations.assets, options.locations.libraries, options.locations.debug, options.includeLibraries, gulp);
	});

	gulp.task(taskNames.copy + '.' + taskNames.release, function () {
		return copyRelease(options.locations.source, options.locations.assets, options.locations.libraries, options.locations.release, options.includeLibraries, gulp);
	});

	gulp.task(taskNames.copy + '.' + taskNames.library, function() {
		return copyDebug(options.locations.source, options.locations.assets, options.locations.libraries, options.locations.library, options.includeLibraries, gulp);
	});
};
