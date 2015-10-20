var Promise = require('bluebird');
var fs = require('./fs');
var mimetype = require('mime');
mimetype.define({
	'text/ini': ['ini']
,	'application/x-my-type': ['x-mt', 'x-mtt']
});
var statsKeys = ['dev','mode','nlink','uid','gid','rdev','blksize','ino','size','blocks','atime','mtime','ctime','birthtime'];

function parseInfo(stats){
	var isDirectory = stats.isDirectory();
	var _stats = {
		isDirectory:isDirectory
	,	isFile:!isDirectory
	};
	statsKeys.forEach(function(key){_stats[key] = stats[key];});
	return _stats
}

module.exports = Promise.promisify(function(rootDir,filePath,relativePath,cb){
	return 	fs.statAsync(filePath)
	.then(parseInfo)
	.then(function(info){
		info.mimetype = info.isDirectory ? 'inode/directory' : mimetype.lookup(filePath) || 'application/octet-stream';
		info.mime = info.mimetype.split('/');
		info.type = info.mime[0];
		if(info.type=='application'){
			if(info.mime[1] == 'json' || info.mime[1]=='xml' || info.mime[1]=='javascript'){
				info.type = 'text';
			}
		}
		info.path = relativePath
		info.fullPath = filePath.replace(rootDir,'')
		cb(null,info);
	})
	.catch(function(err){
		cb(err);
	});
});