"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = addToArray;

function addToArray(arr, items) {
	if (!items || !items.length) {
		return arr;
	}
	items = items.filter(function (item) {
		return arr.indexOf(item) < 0;
	});
	if (items.length) {
		return arr.concat(items);
	}
	return arr;
}

module.exports = exports["default"];