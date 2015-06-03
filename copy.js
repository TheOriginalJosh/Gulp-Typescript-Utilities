var gulp = require('gulp');

var merge = require('merge2');
var _ = require('lodash');

var defaults = require('./defaults');

// Second param can be used as the target if the third param is not specified 
//  (defaults to default source folder)
function copy(extensions, source, target) {
	if (!target) {
		if (!source) {
			source = defaults.sourceFolder;
			target = defaults.debugFolder;
		} else {
			// If only one path is provided, use it as the target
			target = source; 
			source = defaults.sourceFolder;
		}
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

module.exports.copyBowerDefinition = function(target) {
	if (!target) {
		target = defaults.debugFolder;
	}
	
	return gulp.src('./bower.json').pipe(gulp.dest('./' + target));
}

module.exports.config = function (gulp) {
	gulp.task('copy', ['copy.debug']);

	gulp.task('copy.debug', function () {
		return merge([
			copy(['json', 'ts', 'html', 'css'], defaults.sourceFolder, defaults.debugFolder),
			copy('*', defaults.librariesFolder, defaults.debugFolder + '/' + defaults.librariesFolder),
			copy('*', defaults.assetsFolder, defaults.debugFolder + '/' + defaults.assetsFolder),
			copy.copyBowerDefinition(defaults.debugFolder),
		]);
	});
	
	gulp.task('copy.release', function () {
		return merge([
			copy(['json', 'js', 'html', 'css'], defaults.sourceFolder, defaults.releaseFolder),
			copy('*', defaults.librariesFolder, defaults.releaseFolder + '/' + defaults.librariesFolder),
			copy('*', defaults.assetsFolder, defaults.releaseFolder + '/' + defaults.assetsFolder),
			copy.copyBowerDefinition(defaults.releaseFolder),
		]);
	});
};
