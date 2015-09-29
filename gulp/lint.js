var tslint = require('gulp-tslint');
var _ = require('lodash');

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
	source: 'source',
	taskNames: {
		lint: 'lint',
	},
};

module.exports.config = function(options, gulp) {
	options = _.defaultsDeep(options, defaultOptions);

    gulp.task(options.taskNames.lint, function() {
		lintImplementation(options.source, gulp);
    });
};
