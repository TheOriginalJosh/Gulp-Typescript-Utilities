/* global require: false, exports: false */

var gulp = require('gulp');

var replace = require('gulp-replace');
var _ = require('lodash');

exports.debug = function(libReferences, locations, index) {
	var scripts = buildScripts(exports.getReferences(libReferences, locations.libraries));
	return insertScripts(scripts, locations.debug, index);
}

exports.release = function(libReferences, libraryPath, target, index) {
	var scripts = buildScripts(exports.getCDNReferences(libReferences, locations.libraries));
	return insertScripts(scripts, locations.release, index);
};

function insertScripts(scripts, target, index) {
	if (!index) {
		index = 'index.html';
	}
	
    index = target + '/' + index;
	
    // Find <!-- build:js scripts/vendor --> ... <!-- endbuild -->
    // Replace internal block <!-- bower:js --> ... <!-- endbower --> with the script tags
    //                  Find build tag start for vendor scripts....match any content..find bower ref area..match previous bower refs to end..match any content..find end build tag
    //                                  |                                   |                  |               |               |                  |                   |
    //                                  V                                   V                  V               V               V                  V                   V
    var findBowerScriptArea = /<!--\s*build:js\s*scripts\/vendor\s*-->((?:\n|\r|.)*?)<!--\s*bower:js\s*-->(?:\n|\r|.)*<!--\s*endbower\s*-->((?:\n|\r|.)*?)<!--\s*endbuild\s*-->/gim;
    var bowerReferences = '<!--build:js scripts\/vendor-->' +
                          '$1' +
                          '<!--bower:js-->\n' + 
                          scripts +
                          '\t<!--endbower-->' +
                          '$2' +
                          '<!--endbuild-->';

    return gulp.src(index)
        .pipe(replace(findBowerScriptArea, bowerReferences))
        .pipe(gulp.dest(target));
}

exports.getReferences = function (libReferences, libraryPath) {
    return _.map(libReferences, function(ref) { return libraryPath + '/' + ref.js; });
};

exports.getMinifiedReferences = function (libReferences, libraryPath) {
    return _.map(libReferences, function(ref) { return libraryPath + '/' + ref.min; });
};

exports.getCDNReferences = function (libReferences, libraryPath) {
    return _.map(libReferences, function(ref) {
		if (!ref.cdn) {
			return libraryPath + '/' + ref.min;
		} else {
			return libraryPath + '/' + ref.cdn;
		}
	});
};

function buildScripts(references) {
    var scriptTemplate = '\t<script type="text/javascript" src="{0}"></script>';
    return _.reduce(references, function (scripts, reference) {
        return scripts +
            scriptTemplate.replace('{0}', reference) + '\n';
    }, '');        
}
