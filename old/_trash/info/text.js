var Promise = require('bluebird');
var ini = require('ini');
var YAML = require('js-yaml');
var ini = require('ini')
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();
var errorToJson = require('../utils/errToJson');
var fs = require('../files/fs');

module.exports = Promise.promisify(function(filePath,stats,cb){
	return fs.readFileAsync(filePath,{encoding:'utf8'})
	.then(function appendText(fileContents){
		if(fileContents){
			stats.fileContents = fileContents;
			var mimePart = stats.mime[1];
			if(mimePart=='json'){
				try{
					stats.data = JSON.parse(fileContents);
				}catch(e){
					stats.error = errorToJson(e);
				}
				return cb(null,stats);
			}
			if(mimePart=='xml'){
				xmlParser.parseString(fileContents,function(err,result){
					if(err){
						stats.error = errorToJson(err);
					}else{
						stats.data = result;
					}
					return cb(null,stats);
				});
			}
			if(mimePart=='yaml'){
				try{
					stats.data = YAML.safeLoad(
						fileContents
					,	{filename:stats.path,schema:YAML.DEFAULT_FULL_SCHEMA}
					);
				}
				catch(e){
					console.log(e)
					stats.error = errorToJson(e);
				}
				return cb(null,stats);
			}
			if(mimePart=='ini'){
				try{
					stats.ini = ini.parse(fileContents);
				}
				catch(e){
					stats.error = errorToJson(e);
				}
				return cb(null,stats);
			}
			return cb(null,stats);
		}
		cb(null,stats);
	}).catch(function(err){
		cb(err);
	})
});