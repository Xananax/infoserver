'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = validate;

function validate(arg) {
	return typeof arg === 'string' && /group?|file?/i.test(arg);
}

module.exports = exports['default'];