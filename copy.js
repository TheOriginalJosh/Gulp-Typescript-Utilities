var merge = require('merge2');
var _ = require('lodash');

var defaults = require('./defaults');

// Second param can be used as the target if the third param is not specified 
//  (defaults to default source folder)
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
	
	if (!target) {
		target = defaults.debugFolder;
	}
	
	return gulp.src('./bower.json').pipe(gulp.dest('./' + target));
}

module.exports.config = function (gulp, locations) {
	gulp.task('copy', ['copy.debug']);

	gulp.task('copy.debug', function () {
		return merge([
			copy(['json', 'ts', 'js', 'html', 'css'], locations.source, locations.debug, gulp),
			copy('*', locations.libraries, locations.debug + '/' + locations.libraries, gulp),
			copy('*', locations.assets, locations.debug + '/' + locations.assets, gulp),
			copy.copyBowerDefinition(locations.debug, gulp),
		]);
	});
	
	gulp.task('copy.release', function () {
		return merge([
			copy(['json', 'js', 'html', 'css'], locations.source, locations.release, gulp),
			copy('*', locations.libraries, locations.release + '/' + locations.libraries, gulp),
			copy('*', locations.assets, locations.release + '/' + locations.assets, gulp),
			copy.copyBowerDefinition(locations.release, gulp),
		]);
	});
};
