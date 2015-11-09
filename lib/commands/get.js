'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = addGroup;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _parametersType = require('./parameters/type');

var _parametersType2 = _interopRequireDefault(_parametersType);

var _parametersItems = require('./parameters/items');

var _parametersItems2 = _interopRequireDefault(_parametersItems);

var _parametersAll = require('./parameters/all');

var _parametersAll2 = _interopRequireDefault(_parametersAll);

function getGroupNormal(adapter, type, items, cb) {
	if (type && (items && items.length)) {
		if (type === 'file') {
			return adapter.getFiles(items, cb);
		}
		if (type === 'group') {
			return adapter.getGroups(items, cb);
		}
	} else {
		return adapter.getRoot(cb);
	}
}

function getGroupRecursive(adapter, type, items, cb) {
	getGroupNormal(adapter, type, items, function (err, result) {
		var groups = result.groups;
		var files = result.files;

		var groupKeys = Object.keys(groups);
		function next() {}
		cb(err, result);
	});
}

function addGroup(adapter) {
	return {
		name: 'get',
		description: 'retrieves files, groups, or root groups',
		parameters: [_parametersType2['default']],
		optionalParameters: [_parametersItems2['default'], _parametersAll2['default']],
		run: function run(_ref, cb) {
			var type = _ref.type;
			var items = _ref.items;
			var all = _ref.all;

			return getGroupNormal(adapter, type, items, cb);
		}
	};
}

module.exports = exports['default'];