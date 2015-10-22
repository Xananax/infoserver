'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = coerce;

function coerce(args) {
	return typeof args == 'boolean' ? args : typeof args == 'string' && /true|yes/i.test(args) || typeof args == 'number' && args > 0 || false;
}

module.exports = exports['default'];