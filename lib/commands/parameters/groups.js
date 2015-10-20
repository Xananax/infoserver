'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validateGroups = require('./validate/groups');

var _validateGroups2 = _interopRequireDefault(_validateGroups);

var _coerceGroups = require('./coerce/groups');

var _coerceGroups2 = _interopRequireDefault(_coerceGroups);

exports['default'] = {
	name: 'groups',
	description: 'groups names',
	valid: 'array',
	validate: _validateGroups2['default'],
	coerce: _coerceGroups2['default']
};
module.exports = exports['default'];