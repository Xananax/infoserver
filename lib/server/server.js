var http = require('http');
var url = require('url');
var makeMiddleWare = require('./middleWare')
var send = require('./send');

function favicon(res){
	res.writeHead(404);
	res.end();
}

module.exports = function serve(port,rootDir,prefix,cb){
	var middleWare = makeMiddleWare(rootDir,prefix);

	http.createServer(function(req, res){
		if(req.url=='/favicon.ico'){return favicon(res);}
		var _url = url.parse(req.url,true)
		var read = _url.query.hasOwnProperty('read');
		req.path = decodeURI(_url.pathname);
		
		middleWare(req,res,function(err){
			if(err){
				if(err.message.match(/^ENOENT/)){
					err.status = 404;
				}
				send(req,res,req.path,prefix,rootDir,null,read,err);
			}else{
				var stats = req[prefix];
				send(req,res,req.path,prefix,rootDir,stats,read);
			}
		})
	}).listen(port,function(){
		if(cb){cb();}
	});
}