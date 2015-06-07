var build = require('./build');
var clean = require('./clean');
var copy = require('./copy');
var defaults = require('./defaults');
var lint = require('./lint');
var requirejs = requireA('./requirejs');
var resolve = require('./resolve');
var test = require('./test');
var teamCity = require('./teamCity');
var typescript = require('./typescript');

module.exports = {
	build: build,
	clean: clean,
	copy: copy,
	defaults: defaults,
	lint: lint,
	requirejs: requirejs,
	resolve: resolve,
	test: test,
	teamCity: teamCity,
	typescript: typescript,
};
