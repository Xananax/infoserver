'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = coerce;

function coerce(args) {
	return typeof args == 'string' && args.split(',').filter(Boolean) || (Array.isArray(args) ? args : []);
}

module.exports = exports['default'];