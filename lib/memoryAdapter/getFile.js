"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports["default"] = getFile;

function getFile(db, path, cb) {
	if (!(path in db.files.paths)) {
		return cb(new Error("file " + path + " does not exist"));
	}
	return cb(null, db.files.items[db.files.paths[path]]);
}

module.exports = exports["default"];