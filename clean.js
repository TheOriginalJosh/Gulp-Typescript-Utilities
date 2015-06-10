var del = require('del');
var _ = require('lodash');

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

module.exports.config = function(gulp, debug, release) {
	gulp.task('clean', ['clean.debug']);

	gulp.task('clean.debug', function (done) {
		return clean(debug, done);
	});

	gulp.task('clean.release', function (done) {
		return clean(release, done);
	});
};
