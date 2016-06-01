/*global jasmine, __karma__, window*/

// Pull settings off of the window object
var settings = window.settings;

Error.stackTraceLimit = Infinity;
mocha.setup({
	timeout: settings.timeout,
})

__karma__.loaded = function () {
};

// Karma base path
var basePath = '/base';
var appPath = basePath + settings.appPath;

function isJsFile(path) {
	return endsWith(path, '.js');
}

function isSpecFile(path) {
	return endsWith(path, settings.testsExtension);
}

function endsWith(path, ending) {
	return path.slice(-ending.length) == ending;
}

function isAppFile(path) {
	return isJsFile(path) && (path.substr(0, appPath.length) == appPath);
}

function removeBase(path) {
	return path.slice(basePath.length);
}

var allSpecFiles = Object.keys(window.__karma__.files)
	.filter(isSpecFile)
	.filter(isAppFile)
	.map(function (specPath) { return removeBase(specPath) });

// Load our SystemJS configuration.
var paths = {};
paths[settings.configPath] = 'base/' + settings.configPath;

System.config({
	paths: paths,
});

System.import(settings.configPath)
	.then(function () {
		if (settings.testSetupPath) {
			return System.import(settings.testSetupPath)
				.then(function (setup) {
					return setup();
				});
		}
	})
	.then(function () {
		// Finally, load all spec files.
		// This will run the tests directly.
		return Promise.all(
			allSpecFiles.map(function (moduleName) {
				return System.import(moduleName);
			}));
	})
	.then(__karma__.start, __karma__.error);
