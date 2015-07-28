var server = require('./server/server');
var middleWare = require('./server/middleWare');
var getFile = require('./files/getFile');

getFile.server = server;
getFile.middleWare = middleWare;

module.exports = getFile;
