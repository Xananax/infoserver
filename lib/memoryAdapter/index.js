'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _add2 = require('./add');

var _add3 = _interopRequireDefault(_add2);

var _getFiles2 = require('./getFiles');

var _getFiles3 = _interopRequireDefault(_getFiles2);

var _getGroups2 = require('./getGroups');

var _getGroups3 = _interopRequireDefault(_getGroups2);

var _getRoot2 = require('./getRoot');

var _getRoot3 = _interopRequireDefault(_getRoot2);

var _remove2 = require('./remove');

var _remove3 = _interopRequireDefault(_remove2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function noOp(cb) {
	return cb;
}

exports['default'] = _bluebird2['default'].promisify(function memoryAdapterFactory(fs, opts, cb) {

	var persist = !!(opts && opts.persist);
	var filename = persist ? typeof opts.persist === 'string' ? opts.persist : 'db.json' : false;

	var db = {
		files: {
			items: [],
			paths: {}
		},
		groups: {
			items: [],
			names: {}
		}
	};

	function saveFactory(cb) {
		return function save(err, answer) {
			if (err) {
				return cb(err);
			}
			try {
				fs.writeJson(filename, db, { encoding: 'utf8' }).then(function () {
					return cb();
				}).error(cb);
			} catch (e) {
				cb(e);
			}
		};
	}

	var save = persist ? saveFactory : noOp;

	var methods = {
		add: function add(groupName, files, groups, cb) {
			(0, _add3['default'])(db, groupName, files, groups, save(cb));
		},
		getFiles: function getFiles(files, cb) {
			(0, _getFiles3['default'])(db, files, cb);
		},
		getGroups: function getGroups(groups, cb) {
			(0, _getGroups3['default'])(db, groups, cb);
		},
		getRoot: function getRoot(cb) {
			(0, _getRoot3['default'])(db, cb);
		},
		remove: function remove(groupName, files, groups, cb) {
			(0, _remove3['default'])(db, groupName, files, groups, save(cb));
		}
	};

	if (persist) {
		return fs.readJson(filename).then(function (json) {
			db.files = json.files;
			db.groups = json.groups;
			cb(null, methods);
		}).error(function (err) {
			cb(null, methods);
		});
	}

	cb(null, methods);
});
module.exports = exports['default'];