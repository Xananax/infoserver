'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getFiles = getFiles;
exports['default'] = getFilesWithoutCache;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getFile = require('./getFile');

var _getFile2 = _interopRequireDefault(_getFile);

var _getGroups2 = require('./getGroups');

function arrToMap(name, arr) {
	var obj = {};
	arr.forEach(function (item) {
		obj[item[name]] = item;
	});
	return obj;
}

function getFiles(db, files, ret, cb) {
	var length = files.length;

	var i = 0;
	(function next(_x) {
		var _again = true;

		_function: while (_again) {
			var err = _x;
			fileName = undefined;

			var _getGroups = function _getGroups(file, cb) {
				if (file.groups && Array.isArray(file.groups) && file.groups.length) {
					var _groups = file.groups.filter(function (groupName) {
						return !(groupName in ret.groups);
					});
					return (0, _getGroups2.getGroups)(db, _groups, ret, next);
				}
				return cb();
			};

			_again = false;

			if (err) {
				return cb(err);
			}
			if (i >= length) {
				return cb(null, ret);
			}
			var fileName = files[i++];
			if (fileName in ret.files) {
				_x = undefined;
				_again = true;
				continue _function;
			}

			(0, _getFile2['default'])(db, fileName, function (err, file) {
				if (err) {
					return next(err);
				}
				ret.files[fileName] = Object.assign({}, file);
				_getGroups(file, next);
			});
		}
	})();
}

function getFilesWithoutCache(db, files, cb) {
	var ret = {
		groups: {},
		files: {}
	};
	getFiles(db, files, ret, cb);
}