var clean = require('./clean');
var bundle = require('./bundle');
var lint = require('./lint');
var version = require('./version');

module.exports = {
	clean: clean,
	bundle: bundle,
	lint: lint,
	version: version,
};
