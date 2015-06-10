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

module.exports.config = function (gulp, source, libraries, assets, debug, release) {
	gulp.task('copy', ['copy.debug']);

	gulp.task('copy.debug', function () {
		return merge([
			copy(['json', 'ts', 'js', 'html', 'css'], source, debug),
			copy('*', libraries, debug + '/' + libraries),
			copy('*', assets, debug + '/' + assets),
			copy.copyBowerDefinition(debug),
		]);
	});
	
	gulp.task('copy.release', function () {
		return merge([
			copy(['json', 'js', 'html', 'css'], source, release),
			copy('*', libraries, release + '/' + libraries),
			copy('*', assets, release + '/' + assets),
			copy.copyBowerDefinition(release),
		]);
	});
};
