'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = validate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _groupName = require('./groupName');

var _groupName2 = _interopRequireDefault(_groupName);

var _filePath = require('./filePath');

var _filePath2 = _interopRequireDefault(_filePath);

function validate(args) {
	return (0, _groupName2['default'])(args) || (0, _filePath2['default'])(args) || Array.isArray(args) && args.every(function (arg) {
		return (0, _groupName2['default'])(arg) || (0, _filePath2['default'])(arg);
	});
}

module.exports = exports['default'];