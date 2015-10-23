'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _add2 = require('./add');

var _add3 = _interopRequireDefault(_add2);

var _addRoot2 = require('./addRoot');

var _addRoot3 = _interopRequireDefault(_addRoot2);

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

var debug = require('debug')('infoserver:memoryAdapter');

function noOp(cb) {
	return cb;
}

exports['default'] = _bluebird2['default'].promisify(function memoryAdapterFactory(fs, opts, cb) {

	debug('using memory adapter');

	var persist = opts && opts.persist;
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
			debug('saving...');
			if (err) {
				return cb(err);
			}
			try {
				fs.writeJson(filename, db, { encoding: 'utf8' }).then(function () {
					debug('database saved');
					cb();
				})['catch'](function (err) {
					debug('error saving database');
					cb(err);
				});
			} catch (e) {
				debug('error saving database');
				debug(e);
				cb(e);
			}
		};
	}

	var save = persist ? saveFactory : noOp;

	if (!persist) {
		debug('no persistence set, database will not be saved');
	} else {
		debug('persistence on, saving to %s', filename);
	}

	var methods = {
		add: function add(groupName, files, groups, root, cb) {
			debug('add');
			(0, _add3['default'])(db, groupName, files, groups, root, save(cb));
		},
		addRoot: function addRoot(groups, cb) {
			debug('getGroups');
			(0, _addRoot3['default'])(db, groups, save(cb));
		},
		getFiles: function getFiles(files, cb) {
			debug('getFiles');
			(0, _getFiles3['default'])(db, files, cb);
		},
		getGroups: function getGroups(groups, cb) {
			debug('getGroups');
			(0, _getGroups3['default'])(db, groups, cb);
		},
		getRoot: function getRoot(cb) {
			debug('getRoot');
			(0, _getRoot3['default'])(db, cb);
		},
		remove: function remove(groupName, files, groups, cb) {
			debug('remove');
			(0, _remove3['default'])(db, groupName, files, groups, save(cb));
		}
	};

	if (persist) {
		fs.readJson(filename).then(function (json) {
			debug('database loaded');
			db.files = json.files;
			db.groups = json.groups;
			cb(null, methods);
		})['catch'](function (err) {
			debug('database not found or not writeable. Trying to save');
			save(function (err) {
				if (err) {
					return cb(err);
				}
				return cb(null, methods);
			})();
		});
		return;
	}

	cb(null, methods);
});
module.exports = exports['default'];