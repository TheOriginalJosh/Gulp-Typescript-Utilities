var _ = require('lodash');
var jsonfile = require('jsonfile');
var thenify = require('thenify');
var args = require('yargs')
	.alias('v', 'version')
	.argv;

var readJson = thenify(jsonfile.readFile);
var writeJson = thenify(jsonfile.writeFile);

var packageFile = 'package.json';

exports.config = function(gulp) {
	if (_.isUndefined(gulp)) {
		gulp = require('gulp');
	}

	gulp.task('version', (done) => {
		return exports.version(args.version)
			.then(() => {
				console.log('Version changed to ' + versionStr);
				done();
			})
			.catch(err => done(err));
	});
};

exports.version = (version) => {
	return readJson(packageFile)
		.then(package => {
			package.version = version;
			return writeJson(packageFile, package, { spaces: 2 });
		});
};
