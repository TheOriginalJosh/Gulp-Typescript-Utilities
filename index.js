var browserifyKarma = require('./karma/browserify.conf.js');
var build = require('./build');
var clean = require('./clean');
var compile = require('./compile');
var copy = require('./copy');
var defaults = require('./defaults');
var karma = require('./karma/compiled-ts.conf');
var lint = require('./lint');
var requirejs = require('./requirejs');
var resolve = require('./resolve');
var teamCity = require('./teamCity');
var test = require('./test');
var typescript = require('./typescript');
var update = require('./update');

module.exports = {
	browserifyKarma: browserifyKarma,
	build: build,
	clean: clean,
	compile: compile,
	copy: copy,
	defaults: defaults,
	karma: karma,
	lint: lint,
	requirejs: requirejs,
	resolve: resolve,
	teamCity: teamCity,
	test: test,
	typescript: typescript,
	update: update,
};
