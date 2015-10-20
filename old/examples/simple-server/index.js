var rootDir = __dirname;
var port = 1337;
var server = require('../lib').server;

server(port,rootDir,'x',function(){console.log('server listening on '+port)})

