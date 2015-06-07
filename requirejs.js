var gulp = require('gulp');

var requirejs = require('requirejs');
var typescript = require('./typescript');
var del = require('del');

exports.optimize = function(packageName, source, target, done) {
	var sourceStream = gulp.src([
		'./typings/tsd.d.ts',
		'./' + source + '/**/*.ts',
	]);
	
	var result = typescript.compile(sourceStream, true);

	var out = result.js.pipe(gulp.dest('bin'));
	out.on('end', function() {
		requirejs.optimize({
		    baseUrl: 'bin',
		    name: packageName,
		    out: target + '/' + packageName + '.js',
		}, function(buildResponse) {
			console.log(buildResponse);
		}, function(err) {
			console.log(err);
		});
		
		del('bin', done);
	});
};
