var _ = require('lodash');
var shell = require('shelljs');

var defaultOptions = {
	taskNames: {
		update: 'update',
	},
};

exports.config = function(options, gulp) {
	if (_.isUndefined(options)) { options = {}; }

	options = _.defaultsDeep(options, defaultOptions);

	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	gulp.task(options.taskNames.update, function(done) {
		var success = 0;

		shell.echo('npm install');
		var result = shell.exec('npm install');

		if (result.code != success) {
			shell.echo('ERROR: npm install failed');
			return;
		}

		shell.echo('bower install --config.interactive=false');
		result = shell.exec('bower install --config.interactive=false');

		if (result.code != success) {
			shell.echo('ERROR: bower install failed');
			return;
		}

		shell.echo('tsd update');
		result = shell.exec('tsd update');

		if (result.code != success) {
			shell.echo('ERROR: tsd update failed');
		}
	});
};