'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _validateRoot = require('./validate/root');

var _validateRoot2 = _interopRequireDefault(_validateRoot);

var _coerceRoot = require('./coerce/root');

var _coerceRoot2 = _interopRequireDefault(_coerceRoot);

exports['default'] = {
	name: 'root',
	description: 'if true, the group will be added to the root group',
	valid: 'boolean',
	validate: _validateRoot2['default'],
	coerce: _coerceRoot2['default']
};
module.exports = exports['default'];