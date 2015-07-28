var Promise = require('bluebird');
var fs = require('./fs');
var metadata = require('./metadata');

module.exports = Promise.promisify(function(rootDir,filePath,cb){
	return fs.readdirAsync(filePath).then(function(files){
		return Promise.all(files.map(function(file){
			var subFilePath = (filePath ? filePath.replace(/\/$/,'')+'/':'')+file
			return metadata(rootDir,subFilePath,file);
		}));
	})
	.then(function(stats){
		var _dirsStats = stats.filter(function(file){return file.isDirectory});
		var _filesStats = stats.filter(function(file){return file.isFile});
		var _dirsMap = {};
		var _filesMap = {};
		_dirsStats.forEach(function(stat,i){return _dirsMap[stat.path] = i;});
		_filesStats.forEach(function(stat,i){return _filesMap[stat.path] = i;});
		var answer = {
			directories:_dirsStats
		,	files:_filesStats
		,	all:stats
		,	directoriesMap:_dirsMap
		,	filesMap:_filesMap
		}
		cb(null,answer);
	})
	.catch(function(err){
		cb(err);
	})
	;
});