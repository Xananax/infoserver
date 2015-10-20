'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = validate;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _groupName = require('./groupName');

var _groupName2 = _interopRequireDefault(_groupName);

function validate(args) {
	return (0, _groupName2['default'])(args) || Array.isArray(args) && args.every(function (arg) {
		return _groupName2['default'];
	});
}

module.exports = exports['default'];