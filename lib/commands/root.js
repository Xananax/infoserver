'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = addRoot;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _parametersGroups = require('./parameters/groups');

var _parametersGroups2 = _interopRequireDefault(_parametersGroups);

function addRoot(adapter) {
	return {
		name: 'root',
		description: 'adds groups to the root group',
		parameters: [],
		optionalParameters: [_parametersGroups2['default']],
		run: function run(_ref, cb) {
			var groups = _ref.groups;

			if (groups && groups.length) {
				return adapter.addRoot(groups, cb);
			} else {
				return adapter.getRoot(cb);
			}
		}
	};
}

module.exports = exports['default'];