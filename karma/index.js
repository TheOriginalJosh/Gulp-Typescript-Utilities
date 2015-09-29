var debug = require('./debug.config');
var standard = require('./default.config');
var full = require('./full.config');
var tc = require('./teamCity.config');

module.exports = {
	debug: debug,
	standard: standard,
	full: full,
	tc: tc,
};
