'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = validate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _filePath = require('./filePath');

var _filePath2 = _interopRequireDefault(_filePath);

function validate(args) {
	return (0, _filePath2['default'])(args) || Array.isArray(args) && args.every(function (arg) {
		return _filePath2['default'];
	});
}

module.exports = exports['default'];