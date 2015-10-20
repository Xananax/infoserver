var getFile = require('../files/getFile');

module.exports = function makeMiddleWare(rootDir,key){
	rootDir=require('path').resolve(rootDir).replace(/\/+$/)+'/';
	
	return function serveMiddleWare(req,res,next){
		getFile(rootDir,req.path)
		.then(function(stats){
			req[key] = stats;
			next(null);
		}).catch(function(err){
			if(err.message.match(/^ENOENT/i)){
				err.status = 404;
				err.message = 'Not Found';
				err.path = req.path;
			}
			next(err);
		})
	}
}