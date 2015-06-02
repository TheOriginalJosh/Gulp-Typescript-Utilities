var browserify = require('./browserify');
var clean = require('./clean');
var copy = require('./copy');
var defaults = require('./defaults');
var lint = require('./lint');
var resolve = require('./resolve');
var test = require('./test');
var typescript = require('./typescript');

module.exports = {
	browserify: browserify,
	clean: clean,
	copy: copy,
	defaults: defaults,
	lint: lint,
	resolve: resolve,
	test: test,
	typescript: typescript,
};
