'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.getGroups = getGroups;
exports['default'] = getGroupsWithoutCache;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getGroup = require('./getGroup');

var _getGroup2 = _interopRequireDefault(_getGroup);

var _getFiles2 = require('./getFiles');

function arrToMap(name, arr) {
	var obj = {};
	arr.forEach(function (item) {
		obj[item[name]] = item;
	});
	return obj;
}

function getGroups(db, groups, ret, cb) {
	var length = groups.length;

	var i = 0;

	(function next(_x) {
		var _again = true;

		_function: while (_again) {
			var err = _x;
			groupName = undefined;

			var _getFiles = function _getFiles(group, cb) {
				if (group.files && Array.isArray(group.files) && group.files.length) {
					var _files = group.files.filter(function (fileName) {
						return !(fileName in ret.files);
					});
					return (0, _getFiles2.getFiles)(db, _files, ret, next);
				}
				return cb();
			};

			var _getGroups = function _getGroups(group, cb) {
				if (group.groups && Array.isArray(group.groups) && group.groups.length) {
					var _groups = group.groups.filter(function (groupName) {
						return !(groupName in ret.groups);
					});
					return getGroups(db, _groups, ret, next);
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
			var groupName = groups[i++];
			if (groupName in ret.groups) {
				_x = undefined;
				_again = true;
				continue _function;
			}

			(0, _getGroup2['default'])(db, groupName, function (err, group) {
				if (err) {
					return next(err);
				}
				ret.groups[groupName] = Object.assign({}, group);
				_getGroups(group, _getFiles(group, next));
			});
		}
	})();
}

function processObj(obj) {
	var indexes = {};
	var items = [];
	Object.keys(obj).forEach(function (key) {
		var item = obj[key];
		getIndex(item, key, indexes, items);
		item.groups && item.groups.forEach(function (skey) {
			return getIndex(obj[skey], skey, indexes, items);
		});
	});

	return { indexes: indexes, items: items, obj: obj };
}

function getIndex(item, key, indexes, items) {
	indexes[key] = items.push(item) - 1;
}

function getGroupsWithoutCache(db, groups, cb) {
	var ret = {
		groups: {},
		files: {}
	};
	getGroups(db, groups, ret, function (err, result) {
		if (err) {
			return cb(err);
		}
		cb(null, result);
	});
}