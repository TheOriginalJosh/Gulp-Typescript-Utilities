var build = require('./build');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');
var karma = require('./default-karma.conf');
var lint = require('./lint');
var requirejs = require('./requirejs');
var resolve = require('./resolve');
var teamCity = require('./teamCity');
var test = require('./test');
var typescript = require('./typescript');

module.exports = {
	build: build,
	clean: clean,
	compile: compile,
	copy: copy,
	karma: karma,
	lint: lint,
	requirejs: requirejs,
	resolve: resolve,
	teamCity: teamCity,
	test: test,
	typescript: typescript,
};
