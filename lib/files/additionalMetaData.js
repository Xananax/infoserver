var musicInfo = require('../info/audio');
var textInfo = require('../info/text');
var imageInfo = require('../info/image');
var Promise = require('bluebird');

module.exports = Promise.promisify(function(filePath,stats,cb){
	var mimePart = stats.mime[0];
	if(mimePart == 'text' || stats.mimetype=='application/json' || stats.mimetype=='application/xml'){
		return textInfo(filePath,stats).then(function(stats){
			cb(null,stats);
		}).catch(function(err){cb(err);})
	}
	else if(mimePart == 'image'){
		return imageInfo(filePath,stats).then(function(stats){
			cb(null,stats);
		}).catch(function(err){cb(err);})
	}
	else if(mimePart == 'audio'){
		return musicInfo(filePath,stats).then(function(stats){
			cb(null,stats);
		}).catch(function(err){cb(err);})
	}
	return cb(null,stats);
})