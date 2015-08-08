var del = require('del');
var _ = require('lodash');

var defaults = require('./defaults');

function clean(target, done) {
	var dir = './' + target;
	var deleteList = [dir + '/*'];
	deleteList = deleteList.concat(getPreservedFiles(dir));
	return del(deleteList, done);
}

var preservedFiles = [
	'web.config',
];

function getPreservedFiles(directory) {
	return _.map(preservedFiles, function(file) {
		return '!' + directory + '/' + file;
	});
}

module.exports = clean;

var defaultOptions = {
	locations: defaults.locations(),
	taskNames: {
		clean: 'clean',
		debug: 'debug',
		release: 'release',
		library: 'library',
	},
};

module.exports.config = function(options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	options = _.assign(defaultOptions, options);

	var taskNames = options.taskNames;

	gulp.task(taskNames.clean + '.' + taskNames.debug, function (done) {
		return clean(options.locations.debug, done);
	});

	gulp.task(taskNames.clean + '.' + taskNames.release, function (done) {
		return clean(options.locations.release, done);
	});

	gulp.task(taskNames.clean + '.' + taskNames.library, function(done) {
		return clean(options.locations.library, done);
	})
};
