var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
module.exports = fs;