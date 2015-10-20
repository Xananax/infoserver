'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = coerce;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _stringToArray = require('./stringToArray');

var _stringToArray2 = _interopRequireDefault(_stringToArray);

function coerce(args) {
	return (0, _stringToArray2['default'])(args);
}

module.exports = exports['default'];