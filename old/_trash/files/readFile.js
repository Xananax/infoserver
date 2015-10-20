var Promise = require('bluebird');
var fs = require('./fs');
var metadata = require('./metadata')
var additionalMetaData = require('./additionalMetaData')
var readdir = require('./readdir');

module.exports = Promise.promisify(function(rootDir,filePath,relativePath,cb){
		metadata(rootDir,filePath,relativePath)
		.then(function(stats){
			if(stats.isDirectory){
				return readdir(rootDir,filePath)
					.then(function(list){
						stats.files = list;
						stats.size = 0;
						stats.files.files.forEach(function(file){
							stats.size+=file.size;
						})
						return stats;
					})
			}
			return stats;
		})
		.then(function(stats){
			return additionalMetaData(filePath,stats);
		})
		.then(function(stats){
			cb(null,stats);
		})
		.catch(function(error){
			cb(error);
		})
})