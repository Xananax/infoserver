'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = getRoot;

var _getGroups = require('./getGroups');

function getRoot(db, cb) {
	var ret = {
		groups: {},
		files: {}
	};
	(0, _getGroups.getGroups)(db, ['root'], ret, cb);
}

module.exports = exports['default'];