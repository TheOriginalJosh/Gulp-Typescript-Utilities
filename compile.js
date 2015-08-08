var _ = require('lodash');
var runSequence = require('run-sequence');
var merge = require('merge2');

var typescript = require('./typescript');

var defaults = require('./defaults');

var defaultOptions = {
	locations: defaults.locations(),
	taskNames: {
		compile: 'compile',
		debug: 'debug',
		release: 'release',
		library: 'library',
	},
};

exports.config = function(options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	runSequence = runSequence.use(gulp);

	options = _.assign(defaultOptions, options);

	var taskNames = options.taskNames;

	gulp.task(taskNames.compile + '.' + taskNames.debug, function() {
		return typescript.compileDebug(options.locations.source, options.locations.debug, true, gulp);
	});

	gulp.task(taskNames.compile + '.' + taskNames.release, function(done) {
		return typescript.compileRelease(options.locations.source, options.locations.release, false, gulp);
	});

	var library = taskNames.compile + '.' + taskNames.library;
	var libraryDebug = library + '.' + taskNames.debug;
	var libraryRelease = library + '.' + taskNames.release;
	var setMinifyOutput = library + '.setOutputMinify';
	var resetMinifyOutput = library + '.resetOutputMinify';

	gulp.task(taskNames.compile + '.' + taskNames.library, function(done) {
		runSequence(libraryDebug,
					setMinifyOutput,
					libraryRelease,
					resetMinifyOutput,
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