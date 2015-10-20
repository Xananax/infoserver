'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validateGroupName = require('./validate/groupName');

var _validateGroupName2 = _interopRequireDefault(_validateGroupName);

exports['default'] = {
	name: 'groupName',
	description: 'a group name',
	validate: _validateGroupName2['default']
};
module.exports = exports['default'];