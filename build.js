var _ = require('lodash');

var lint = require('./lint');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');

var defaults = require('./defaults');

var defaultOptions = {
	locations: defaults.locations(),
	useLint: true,
	includeLibraries: true,
	taskNames: {
		lint: 'lint',
		build: 'build',
		clean: 'clean',
		compile: 'compile',
		copy: 'copy',
		debug: 'debug',
		release: 'release',
		library: 'library',
	},
};

exports.config = function(options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	var runSequence = require('run-sequence').use(gulp);

	options = _.defaultsDeep(options, defaultOptions);

	lint.config(options, gulp);
	clean.config(options, gulp);
	compile.config(options, gulp);
	copy.config(options, gulp);

	var taskNames = options.taskNames;

	gulp.task(taskNames.build + '.' + taskNames.debug, function(done) {
		if (options.useLint) {
			runSequence(taskNames.lint,
						taskNames.clean + '.' + taskNames.debug,
						taskNames.compile + '.' + taskNames.debug,
						taskNames.copy + '.' + taskNames.debug,
						done);
		} else {
			runSequence(taskNames.clean + '.' + taskNames.debug,
						taskNames.compile + '.' + taskNames.debug,
						taskNames.copy + '.' + taskNames.debug,
						done);
		}
	});

	gulp.task(taskNames.build + '.' + taskNames.release, function(done) {
		if (options.useLint) {
			runSequence(taskNames.lint,
						taskNames.clean + '.' + taskNames.release,
						taskNames.compile + '.' + taskNames.release,
						taskNames.copy + '.' + taskNames.release,
						done);
		} else {
			runSequence(taskNames.clean + '.' + taskNames.release,
						taskNames.compile + '.' + taskNames.release,
						taskNames.copy + '.' + taskNames.release,
						done);
		}
	});

	gulp.task(taskNames.build + '.' + taskNames.library, function(done) {
		if (options.useLint) {
			runSequence(taskNames.lint,
						taskNames.clean + '.' + taskNames.library,
						taskNames.compile + '.' + taskNames.library,
						taskNames.copy + '.' + taskNames.library,
						done);
		} else {
			runSequence(taskNames.clean + '.' + taskNames.library,
						taskNames.compile + '.' + taskNames.library,
						taskNames.copy + '.' + taskNames.library,
						done);
		}
	});
};
