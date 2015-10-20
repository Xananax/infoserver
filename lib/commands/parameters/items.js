'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validateItems = require('./validate/items');

var _validateItems2 = _interopRequireDefault(_validateItems);

var _coerceItems = require('./coerce/items');

var _coerceItems2 = _interopRequireDefault(_coerceItems);

exports['default'] = {
	name: 'items',
	description: 'group names or files paths',
	valid: 'array',
	validate: _validateItems2['default'],
	coerce: _coerceItems2['default']
};
module.exports = exports['default'];