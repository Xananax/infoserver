"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = getGroup;

function getGroup(db, name, cb) {
	if (!(name in db.groups.names)) {
		return cb(new Error("group " + name + " does not exist"));
	}
	return cb(null, db.groups.items[db.groups.names[name]]);
}

module.exports = exports["default"];