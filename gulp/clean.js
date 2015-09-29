var _ = require('lodash');
var del = require('del');

var defaultOptions = {
	location: './source',
};

exports.config = function (options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	if (!options) {
		options = {};
	}

	options = _.defaults(options, defaultOptions);

	gulp.task('clean', function (done) {
		return exports.clean(options.location, done);
	});
}

exports.clean = function (target, done) {
	var dir = './source';
	var jsFiles = '/**/*.js';
	var mapFiles = '/**/*.js.map';
	var typingFiles = '/**/*.d.ts';
	return del([dir + jsFiles, dir + mapFiles, dir + typingFiles], done);
}
