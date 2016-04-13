module.exports = [
	{
		test: /\.css$/,
		loader: 'style-loader!css-loader',
	},
	{
		test: /\.html$/,
		loader: 'raw-loader',
	},
	{
		test: /\.json$/,
		loader: 'json-loader',
	},
];
