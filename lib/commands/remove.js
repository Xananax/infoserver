'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = removeGroup;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _parametersGroupName = require('./parameters/groupName');

var _parametersGroupName2 = _interopRequireDefault(_parametersGroupName);

var _parametersFiles = require('./parameters/files');

var _parametersFiles2 = _interopRequireDefault(_parametersFiles);

var _parametersGroups = require('./parameters/groups');

var _parametersGroups2 = _interopRequireDefault(_parametersGroups);

function removeGroup(adapter) {
	return {
		name: 'remove',
		description: 'removes a group',
		parameters: [_parametersGroupName2['default']],
		optionalParameters: [_parametersFiles2['default'], _parametersGroups2['default']],
		run: function run(_ref, cb) {
			var groupName = _ref.groupName;
			var files = _ref.files;
			var groups = _ref.groups;

			adapter.remove(groupName, files, groups, cb);
		}
	};
}

module.exports = exports['default'];