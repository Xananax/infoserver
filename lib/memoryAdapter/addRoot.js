'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = addRoot;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _getOrCreateGroup = require('./getOrCreateGroup');

var _getOrCreateGroup2 = _interopRequireDefault(_getOrCreateGroup);

var _appendArray = require('./appendArray');

var _appendArray2 = _interopRequireDefault(_appendArray);

function addRoot(db, groups, cb) {
	var rootGroup = (0, _getOrCreateGroup2['default'])(db, 'root');
	var groupsNames = groups.map(function (name) {
		var group = (0, _getOrCreateGroup2['default'])(db, name);
		group.root = true;
		return name;
	});
	rootGroup.groups = (0, _appendArray2['default'])(rootGroup.groups, groupsNames);
	return cb(null, rootGroup);
}

module.exports = exports['default'];