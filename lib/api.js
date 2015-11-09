'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _apido = require('apido');

var _apido2 = _interopRequireDefault(_apido);

var _fsMeta = require('fs-meta');

var _fsMetaLibApiCommands = require('fs-meta/lib/api/commands');

var _fsMetaLibApiCommands2 = _interopRequireDefault(_fsMetaLibApiCommands);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var _memoryAdapter = require('./memoryAdapter');

var _memoryAdapter2 = _interopRequireDefault(_memoryAdapter);

var debug = require('debug')('infoserver');

exports['default'] = _bluebird2['default'].promisify(function makeAPI(rootdir, options, cb) {

	debug('creating infoServer API');

	var fs = (0, _fsMeta.boxed)(rootdir);

	var adapter = options && options.adapter || _memoryAdapter2['default'];

	if (options) {
		for (var _name in options) {
			debug('option: ' + _name + ':' + options[_name]);
		}
	} else {
		debug('no options');
	}

	adapter(fs, options).then(function (adapter) {
		return (0, _apido2['default'])({
			name: 'selection',
			description: 'Manages selections of files',
			'default': 'help',
			useJson: true,
			commands: _commands2['default'].map(function (command) {
				return command(adapter, fs);
			})
		});
	}).then(function (selectionsApi) {
		return [selectionsApi, (0, _apido2['default'])({
			name: 'infoServer',
			description: 'File system manager',
			useJson: true,
			commands: _fsMetaLibApiCommands2['default'].map(function (command) {
				return command(fs, {});
			})
		})];
	}).spread(function (selectionsApi, api) {
		fs.filters.push(function getSelection(meta, options, cb, fs) {
			meta, selectionsApi.commands.get(['file', [meta.path]]).then(function (answer) {
				meta.groups = answer.result.files[meta.path].parents;
				cb(null, meta);
			})['catch'](function (err) {
				meta.groups = [];
				cb(null, meta);
			});
		});
		api.nest(selectionsApi);
		api.selections = selectionsApi;
		debug('api ready');
		cb(null, api);
	}).error(cb);
});
module.exports = exports['default'];