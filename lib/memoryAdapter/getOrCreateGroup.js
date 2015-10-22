"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = getOrCreateGroup;

function getOrCreateGroup(db, name) {
	if (!(name in db.groups.names)) {
		db.groups.names[name] = db.groups.items.push({
			name: name,
			files: [],
			groups: []
		}) - 1;
	}
	return db.groups.items[db.groups.names[name]];
}

module.exports = exports["default"];