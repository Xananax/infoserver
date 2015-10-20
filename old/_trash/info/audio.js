var id3 = require('id3js');
var Promise = require('bluebird');

module.exports = Promise.promisify(function(filePath,stats,cb){
	id3({ file:filePath, type: id3.OPEN_LOCAL }, function(err, tags) {
		if(err){return cb(err);}
		for(var n in tags.v1){
			if(typeof tags.v1[n] !== 'string'){continue;}
			tags.v1[n] = tags.v1[n].replace(/\u0000/g,'');
		}
		stats.tags = tags;
		return cb(null,stats);
	});
});