var Promise = require('bluebird')
var sizeOf = require('image-size');
var ExifImage = require('exif').ExifImage;
var exifData = Promise.promisify(function getExifData(imageName,cb){
	new ExifImage({image:imageName},cb);
});

module.exports = Promise.promisify(function(filePath,stats,cb){		
	if(stats.mime[1] == 'x-icon'){
		return cb(null,stats);
	}
	try{
		stats.size = sizeOf(filePath);
	}catch(e){
		stats.size = {width:undefined,height:undefined};
	}
	return exifData(filePath).then(function(exif){
		if(exif){stats.exif = exif;}
		cb(null,stats);
	}).catch(function(err){
		cb(null,stats);
	})
})