'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validateFiles = require('./validate/files');

var _validateFiles2 = _interopRequireDefault(_validateFiles);

var _coerceFiles = require('./coerce/files');

var _coerceFiles2 = _interopRequireDefault(_coerceFiles);

exports['default'] = {
	name: 'files',
	description: 'files paths',
	valid: 'array',
	validate: _validateFiles2['default'],
	coerce: _coerceFiles2['default']
};
module.exports = exports['default'];