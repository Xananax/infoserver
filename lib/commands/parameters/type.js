'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validateType = require('./validate/type');

var _validateType2 = _interopRequireDefault(_validateType);

var _coerceType = require('./coerce/type');

var _coerceType2 = _interopRequireDefault(_coerceType);

exports['default'] = {
	name: 'type',
	description: 'type of item to retrieve',
	valid: '"group" or "file"',
	validate: _validateType2['default'],
	coerce: _coerceType2['default']
};
module.exports = exports['default'];