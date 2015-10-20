var server = require('./server/server');
var middleware = require('./server/middleware');
var getFile = require('./files/getFile');
var infoToHeader = require('./server/infoToHeader');

getFile.server = server;
getFile.middleware = middleware;
getFile.infoToHeader = infoToHeader;
module.exports = getFile;
