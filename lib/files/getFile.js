var saneUrl = require('../utils/saneUrl');
var readFile = require('./readFile');
var Promise = require('bluebird');

module.exports = Promise.promisify(function(rootDir,path,cb){
	if(arguments.length==2){
		cb = path;
		path = rootDir;
	}
	rootDir = rootDir || '';
	var relativePath = saneUrl(path);
	var filePath = rootDir+relativePath;
	readFile(rootDir,filePath,relativePath)
	.then(function(stats){
		cb(null,stats);
	}).catch(function(err){
		cb(err);
	})
})