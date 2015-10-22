'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = validate;

function validate(arg) {
	return typeof arg == 'boolean' || typeof arg == 'number' || typeof arg == 'string' && /true|yes|false|no|1|0/.test(arg);
}

module.exports = exports['default'];