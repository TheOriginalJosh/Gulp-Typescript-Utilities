var karma = require('./karma.config');
var library = require('./library.config');
var libraryMin = require('./library.min.config');
var ts = require('./ts.config');

module.exports = {
	karma: karma,
	library: library,
	libraryMin: libraryMin,
	ts: ts,
};
