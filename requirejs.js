var typescript = require('./typescript');
var merge = require('merge2');

var requirejs = require('requirejs');

var del = require('del');

exports.config = function (gulp, packageName, locations) {
	gulp.task('compile.release.bin', function () {
		var sourceStream = gulp.src([
			'./typings/**/*.d.ts',
			'./' + locations.source + '/**/*.ts',
		]);

		var result = typescript.compile(sourceStream, true);

		return merge([
			result.js.pipe(gulp.dest('bin')),
			result.dts.pipe(gulp.dest('./' + locations.release)),
		]);
	});

	gulp.task('compile.release.optimize', function (done) {
		requirejs.optimize({
			baseUrl: 'bin',
			name: packageName,
			out: locations.release + '/' + packageName + '.js',
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