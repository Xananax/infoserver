'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = add;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getOrCreateGroup = require('./getOrCreateGroup');

var _getOrCreateGroup2 = _interopRequireDefault(_getOrCreateGroup);

var _appendArray = require('./appendArray');

var _appendArray2 = _interopRequireDefault(_appendArray);

var _addRoot = require('./addRoot');

var _addRoot2 = _interopRequireDefault(_addRoot);

function getOrCreateFile(db, path) {
	if (!(path in db.files.paths)) {
		db.files.paths[path] = db.files.items.push({
			path: path,
			parents: []
		}) - 1;
	}
	return db.files.items[db.files.paths[path]];
}

function add(db, groupName, files, groups, root, cb) {
	var group = (0, _getOrCreateGroup2['default'])(db, groupName);
	if (groups && groups.length) {
		groups = groups.map(function (childGroupName) {
			if (childGroupName == groupName) {
				return false;
			}
			var childGroup = (0, _getOrCreateGroup2['default'])(db, childGroupName);
			childGroup.groups = (0, _appendArray2['default'])(childGroup.groups, [groupName]);
			return childGroupName;
		}).filter(Boolean);
	}
	if (files && files.length) {
		files = files.map(function (fileName) {
			var file = getOrCreateFile(db, fileName);
			file.parents = (0, _appendArray2['default'])(file.parents, [groupName]);
			return fileName;
		}).filter(Boolean);
	}
	group.groups = (0, _appendArray2['default'])(group.groups, groups);
	group.files = (0, _appendArray2['default'])(group.files, files);
	if (root) {
		(0, _addRoot2['default'])(db, [groupName], function (err) {
			if (err) {
				return cb(err);
			}
			cb(null, group);
		});
	}
	return cb(null, group);
}

module.exports = exports['default'];