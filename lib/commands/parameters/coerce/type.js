'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = coerce;

function coerce(args) {
	return (/file?/i.test(args) ? 'group' : 'file'
	);
}

module.exports = exports['default'];