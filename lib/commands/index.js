'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _add = require('./add');

var _add2 = _interopRequireDefault(_add);

var _remove = require('./remove');

var _remove2 = _interopRequireDefault(_remove);

var _get = require('./get');

var _get2 = _interopRequireDefault(_get);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

exports['default'] = [_add2['default'], _remove2['default'], _get2['default'], _root2['default']];
module.exports = exports['default'];