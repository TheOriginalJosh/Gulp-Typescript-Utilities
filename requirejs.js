var runSequence = require('run-sequence');

var typescript = require('./typescript');
var del = require('del');

var merge = require('merge2');

exports.config = function (gulp, packageName, source, target) {
	gulp.task('compile.release.bin', function () {
		var sourceStream = gulp.src([
			'./typings/tsd.d.ts',
			'./' + source + '/**/*.ts',
		]);

		var result = typescript.compile(sourceStream, true);

		return merge([
			result.js.pipe(gulp.dest('bin')),
			result.dts.pipe(gulp.dest('./' + target)),
		]);
	});

	gulp.task('compile.release.optimize', function (done) {
		requirejs.optimize({
			baseUrl: 'bin',
			name: packageName,
			out: target + '/' + packageName + '.js',
		}, function (buildResponse) {
			console.log(buildResponse);
			done();
		}, function (err) {
			console.log(err);
			done();
		});
	});

	gulp.task('compile.release.clean', function (done) {
		del('bin', done);
	});
}