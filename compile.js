var _ = require('lodash');
var runSequence = require('run-sequence');
var merge = require('merge2');

var typescript = require('./typescript');

var defaults = require('./defaults');

var defaultOptions = {
	locations: defaults.locations(),
	taskNames: {
		compile: {
			debug: 'compile.debug',
			release: 'compile.release',
			library: 'compile.library',
		},
	},
};

exports.config = function(options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	runSequence = runSequence.use(gulp);

	options = _.extends(defaultOptions, options);

	gulp.task(options.taskNames.compile.debug, function() {
		return typescript.compileDebug(options.locations.source, options.locations.debug, true, gulp);
	});

	gulp.task(options.taskNames.compile.release, function(done) {
		return typescript.compileRelease(options.locations.source, options.locations.release, false, gulp);
	});

	var libraryDebug = options.taskNames.compile.library + '.debug';
	var libraryRelease = options.taskNames.compile.library + '.release';
	var setMinifyOutput = options.taskNames.compile.library + '.setOutputMinify';
	var resetMinifyOutput = options.taskNames.compile.library + '.resetOutputMinify';

	gulp.task(options.taskNames.compile.library, function(done) {
		runSequence(libraryDebug,
					options.taskNames.setMinifyOutput,
					libraryRelease,
					options.taskNames.resetMinifyOutput,
					done);
	});

	gulp.task(libraryDebug, function() {
		return typescript.compileDebug(options.locations.source, options.locations.library, true, gulp);
	});

	var defaultOutput = typescript.project.options.out;

	gulp.task(setMinifyOutput, function() {
		var match = /(.*)(\.js)/;
		typescript.project.options.out = defaultOutput.replace(match, '$1.min$2');
	})

	gulp.task(libraryRelease, function() {
		return typescript.compileRelease(options.locations.source, options.locations.library, false, gulp);
	});

	gulp.task(resetMinifyOutput, function() {
		typescript.project.options.out = defaultOutput;
	})
};