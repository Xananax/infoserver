var send = require('send');
var infoToHeader = require('./infoToHeader')
function html(title,text){
	return '<html><head><title>'+title+'</title></head><body><h1>'+title+'</h1><div>'+text+'</div></body></html>';
}

function list(files){
	return ('<ul>'+files.map(function(file){
		return '<li><a href="/'+file.fullPath+'?read">'+file.path+'</a></li>';
	}).join('')+'</ul>');
}

function sendHTML(res,stats,prefix){
	statsStr = JSON.stringify(stats)
	infoToHeader(res,stats,prefix)
	res.writeHead(200, {'Content-Type': 'text/html'});
	var data;
	if(stats.isDirectory){
		data = html(stats.path,list(stats.files.directories)+list(stats.files.files));
	}else{
		data = html(stats.path,statsStr);
	}
	res.end(data);
}


function sendFile(req,res,relativePath,stats,prefix,rootDir,error){
	infoToHeader(res,stats,prefix)
	send(req,relativePath,{root:rootDir})
	.on('error',error)
	.pipe(res);
}

function sendHTMLError(res,err){
	var n = err.status || 500;
	res.writeHead(n, {'Content-Type': 'text/html'});	
	res.end(html('Error',err.message+'<pre>'+err.stack+'</pre>'));
	return;
}

function sendJSONError(res,err){
	var n = err.status || 500;
	res.writeHead(n, {'Content-Type': 'application/json'});
	res.end(JSON.stringify({error:true,message:err.message,stack:err.stack.split(/\n/)}));
}

function sendAnyError(res,err,read){
	console.log(err);
	if(read){
		return sendHTMLError(res,err);
	}
	return sendJSONError(res,err);
}

function sendJSON(res,stats){
	res.writeHead(200, {'Content-Type': 'application/json'});
	var data = JSON.stringify(stats);
	res.end(data);
}

function sendAnything(req,res,relativePath,prefix,rootDir,stats,read,error){
	if(error){
		return sendAnyError(res,error,read);
	}
	if(read){
		if(stats.isDirectory){
			return sendHTML(res,stats,prefix);
		}
		return sendFile(req,res,relativePath,stats,prefix,rootDir,function(err){
			sendAnyError(res,err,read)
		});
	}
	sendJSON(res,stats);
}

module.exports = sendAnything;