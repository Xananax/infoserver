'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = validate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isString = require('./isString');

var _isString2 = _interopRequireDefault(_isString);

function validate(arg) {
	return (0, _isString2['default'])(arg);
}

module.exports = exports['default'];