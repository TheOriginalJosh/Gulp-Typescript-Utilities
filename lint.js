var tslint = require('gulp-tslint');
var _ = require('lodash');

var defaults = require('./defaults');

function lintImplementation(source, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	gulp.src(['./' + source + '/**/*.ts', '!./source/typings/*.d.ts'])
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
}

module.exports = lintImplementation;

var defaultOptions = {
	locations: defaults.locations(),
	taskNames: {
		lint: 'lint',
	},
};

module.exports.config = function(options, gulp) {
	options = _.assign(defaultOptions, options);

    gulp.task(options.taskNames.lint, function() {
		lintImplementation(options.locations.source, gulp);
    });
};
