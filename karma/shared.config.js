var _ = require('lodash');
var fs = require('fs');

exports.baseConfig = function(karma) {
	return {
		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai', 'sinon'],

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// level of logging
		// possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
		logLevel: karma.LOG_INFO,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeNoSandbox'],

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		port: 2000,

		plugins: [
			require('karma-mocha'),
			require('karma-chai'),
			require('karma-sinon'),
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-ie-launcher'),
		],

		customLaunchers: {
			ChromeNoSandbox: {
				base: 'Chrome',
				flags: ['--no-sandbox'],
			},
		},
	};
};

exports.polyfills = [
	{ pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false },
	{ pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false },
	{ pattern: 'node_modules/reflect-metadata/Reflect.js', included: true, watched: false },
	{ pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false },
	{ pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false },
	{ pattern: 'node_modules/zone.js/dist/fake-async-test.js', included: true, watched: false },
];

exports.karmaShimFile = {
	pattern: 'node_modules/@renovolive/gulp-utilities/karma/karma-test-shim.js',
	included: true,
	watched: false,
};

exports.defaultSettings = {
	timeout: 2000,
	appPath: '/source/',
	testsExtension: '.tests.js',
	configPath: 'system.config.js',
	globalSettingsPath: 'globalSettings.js',
};

exports.config = function(karma, fileDependencies, settings) {
	settings = settings || {};
	settings = _.defaults(settings, exports.defaultSettings);

	fs.writeFileSync(settings.globalSettingsPath, 'window.settings = ' + JSON.stringify(settings) + ';', 'utf8');

	fileDependencies = arrayify(fileDependencies);
	fileDependencies.map(function(file) {
		return {
			pattern: file,
			included: true,
			watched: true,
		}
	});

	var settingsFile = {
		pattern: settings.globalSettingsPath,
		included: true,
		watched: false,
	};

	var systemConfigFile = {
		pattern: settings.configPath,
		included: false,
		watched: true,
	};

	var testsReference = {
		pattern: 'source/**/*' + settings.testsExtension,
		included: false,
		watched: false,
	}

	var options = exports.baseConfig(karma);
	options.files = exports.polyfills
		.concat(fileDependencies)
		.concat([settingsFile])
		.concat([exports.karmaShimFile])
		.concat([systemConfigFile])
		.concat([testsReference]);

	karma.set(options);
	return options;

}

function arrayify(maybeArray) {
	if (_.isArray(maybeArray)) {
		return maybeArray;
	} else if (maybeArray) {
		return [maybeArray];
	} else {
		return [];
	}
}

function addPreprocessor(options, path) {
	options.preprocessors = options.preprocessors || {};
	options.preprocessors[path] = [webpackPreprocessorLibrary];
}
