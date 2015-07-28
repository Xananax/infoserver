var server = require('./server/server');
var middleWare = require('./server/middleWare');
var readFile = require('./files/getFile');

readFile.server = server;
readFile.middleWare = middleWare;

module.exports = readFile;
