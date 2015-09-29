var webpackTS = require('./ts.config');

module.exports = function() {
	var karmaWebpack = webpackTS();
	karmaWebpack.devtool = 'inline-source-map';
	return karmaWebpack;
};
