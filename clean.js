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
		clean: {
			debug: 'clean.debug',
			release: 'clean.release',
			library: 'clean.library',
		},
	},
};

module.exports.config = function(options, gulp) {
	options = _.extends(defaultOptions, options);

	gulp.task(options.taskNames.clean.debug, function (done) {
		return clean(options.locations.debug, done);
	});

	gulp.task(options.taskNames.clean.release, function (done) {
		return clean(options.locations.release, done);
	});

	gulp.task(options.taskNames.clean.library, function(done) {
		return clean(options.locations.library, done);
	})
};
