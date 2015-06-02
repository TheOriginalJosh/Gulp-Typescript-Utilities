var browserify = require('./browserify');
var build = require('./build');
var clean = require('./clean');
var copy = require('./copy');
var defaults = require('./defaults');
var lint = require('./lint');
var resolve = require('./resolve');
var test = require('./test');
var ts = require('./ts');
var typescript = require('./typescript');

module.exports = {
	browserify: browserify,
	build: build,
	clean: clean,
	copy: copy,
	defaults: defaults,
	lint: lint,
	resolve: resolve,
	test: test,
	ts: ts,
	typescript: typescript,
};
