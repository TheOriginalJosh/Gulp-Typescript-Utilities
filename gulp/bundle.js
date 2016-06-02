var _ = require('lodash');
var runSequence = require('run-sequence');
var path = require('path');
var Builder = require('systemjs-builder');

var defaultOptions = {
	mainAppFiles: ['source/**/*.js', 'source/**/*.html', '*.js'],
	renovoDependencies: [
		'node_modules/@renovolive/**/*.js',
		'node_modules/@renovolive/**/*.html',
		'node_modules/typescript-angular-components/**/*.js',
		'node_modules/typescript-angular-components/**/*.html',
		'node_modules/typescript-angular-utilities/**/*.js',
	],
	systemConfig: './system.config.js',
	outDir: 'bundles',
	outFile: 'bundle.js',
	vendorFile: 'vendor.bundle.js',
	renovoFile: 'renovo.bundle.js',
	makeRenovoBundle: true,
};

exports.config = function(taskName, bundleSource, options, gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	var options = options || {};
	options = _.defaults(options, defaultOptions);

	var taskPrefix = 'bundle-' + taskName;

	var bundlePath = path.join(options.outDir, options.outFile);
	var vendorPath = path.join(options.outDir, options.vendorFile);

	gulp.task(taskPrefix + '.watch', (done) => {
		gulp.watch(scriptFiles, [taskPrefix]);
	});

	var mainAppFilesStr =
		'(' + options.mainAppFiles.map(item => '[' + item + ']').join(' + ') + ')';

	if (options.makeRenovoBundle) {
		var renovoPath = path.join(options.outDir, options.renovoFile);

		var renovoDependenciesStr =
			'(' + options.renovoDependencies.map(dep => '[' + dep + ']').join(' + ') + ')';

		gulp.task(taskPrefix + '.all', (done) => {
			runSequence(taskPrefix + '-vendor',
						taskPrefix + '-renovo',
						taskPrefix,
						done);
		})

		gulp.task(taskPrefix, (done) => {
			var builder = new Builder();

			builder.loadConfig(options.systemConfig)
				.then(() => {
					return builder.bundle([bundleSource, vendorPath, renovoPath].join(' - '), bundlePath, {
						sourceMaps: true,
					});
				})
				.then(() => {
					console.log('Build complete');
					done();
				})
				.catch((err) => {
					console.log('Build error');
					done(err);
				});
		});

		gulp.task(taskPrefix + '-vendor', (done) => {
			var builder = new Builder();

			builder.loadConfig(options.systemConfig)
				.then(() => {
					return builder.bundle([bundleSource, mainAppFilesStr, renovoDependenciesStr].join(' - '), vendorPath);
				})
				.then(() => {
					console.log('Build complete');
					done();
				})
				.catch((err) => {
					console.log('Build error');
					done(err);
				});
		});

		gulp.task(taskPrefix + '-renovo.watch', (done) => {
			gulp.watch(renovoDeps, [taskPrefix + '-renovo']);
		})

		gulp.task(taskPrefix + '-renovo', (done) => {
			var builder = new Builder();

			builder.loadConfig(options.systemConfig)
				.then(() => {
					return builder.bundle([bundleSource, mainAppFilesStr, vendorPath].join(' - '), renovoPath);
				})
				.then(() => {
					console.log('Build complete');
					done();
				})
				.catch((err) => {
					console.log('Build error');
					done(err);
				});
		});
	} else {
		// Configure tasks without bundle-renovo step
		gulp.task(taskPrefix + '.all', (done) => {
			runSequence(taskPrefix + '-vendor',
						taskPrefix,
						done);
		})

		gulp.task(taskPrefix, (done) => {
			var builder = new Builder();

			builder.loadConfig(options.systemConfig)
				.then(() => {
					return builder.bundle([bundleSource, vendorPath].join(' - '), bundlePath, {
						sourceMaps: true,
					});
				})
				.then(() => {
					console.log('Build complete');
					done();
				})
				.catch((err) => {
					console.log('Build error');
					done(err);
				});
		});

		gulp.task(taskPrefix + '-vendor', (done) => {
			var builder = new Builder();

			builder.loadConfig(options.systemConfig)
				.then(() => {
					return builder.bundle([bundleSource, mainAppFilesStr].join(' - '), vendorPath);
				})
				.then(() => {
					console.log('Build complete');
					done();
				})
				.catch((err) => {
					console.log('Build error');
					done(err);
				});
		});
	}
};
