var del = require('del');

function clean(target, done) {
	var dir = './' + target;
	return del([dir + '/*', '!' + dir + '/web.config'], done);
}

module.exports = clean;

var defaults = require('./defaults');

module.exports.config = function(gulp) {
	gulp.task('clean', ['clean.debug']);

	gulp.task('clean.debug', function (done) {
		return clean(defaults.debugFolder, done);
	});

	gulp.task('clean.release', function (done) {
		return clean(defaults.releaseFolder, done);
	});
};
