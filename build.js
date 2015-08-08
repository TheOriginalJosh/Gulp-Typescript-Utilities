var _ = require('lodash');

var lint = require('./lint');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');

var defaults = require('./defaults');

var runSequence = require('run-sequence');

var defaultOptions = {
	locations: defaults.locations(),
	useLint: true,
	includeLibraries: true,
	taskNames: {
		lint: 'lint',
		build: {
			debug: 'build.debug',
			release: 'build.release',
			library: 'build.library',
		},
		clean: {
			debug: 'clean.debug',
			release: 'clean.release',
			library: 'clean.library',
		},
		compile: {
			debug: 'compile.debug',
			release: 'compile.release',
			library: 'compile.library',
		},
		copy: {
			debug: 'copy.debug',
			release: 'copy.release',
			library: 'copy.library',
		},
	},
};

exports.config = function(options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	runSequence = runSequence.use(gulp);

	options = _.extend(defaultOptions, options);

	lint.config(options, gulp);
	clean.config(options, gulp);
	compile.config(options, gulp);
	copy.config(options, gulp);

	gulp.task(options.taskNames.build.debug, function(done) {
		if (options.useLint) {
			runSequence(options.taskNames.lint,
						options.taskNames.clean.debug,
						options.taskNames.compile.debug,
						options.taskNames.copy.debug,
						done);
		} else {
			runSequence(options.taskNames.clean.debug,
						options.taskNames.compile.debug,
						options.taskNames.copy.debug,
						done);
		}
	});

	gulp.task(options.taskNames.build.release, function(done) {
		if (options.useLint) {
			runSequence(options.taskNames.lint,
						options.taskNames.clean.release,
						options.taskNames.compile.release,
						options.taskNames.copy.release,
						done);
		} else {
			runSequence(options.taskNames.clean.release,
						options.taskNames.compile.release,
						options.taskNames.copy.release,
						done);
		}
	});

	gulp.task(options.taskNames.build.library, function(done) {
		if (options.useLint) {
			runSequence(options.taskNames.lint,
						options.taskNames.clean.library,
						options.taskNames.compile.library,
						options.taskNames.copy.library,
						done);
		} else {
			runSequence(options.taskNames.clean.library,
						options.taskNames.compile.library,
						options.taskNames.copy.library,
						done);
		}
	});
};
