var karma = require('./karma.config');
var library = require('./library.config');
var libraryMin = require('./library.min.config');
var defaultLoaders = require('./defaultLoaders');

module.exports = {
	karma: karma,
	library: library,
	libraryMin: libraryMin,
	loaders: defaultLoaders,
};
