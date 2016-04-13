module.exports = function(options) {
	return {
		bail: true,
		entry: options.entry,
		output: {
			path: options.path,
			publicPath: options.publicPath || options.path,
			filename: options.filename,
			library: options.library,
			libraryTarget: 'this',
		},
		externals: options.externals,
	};
};
