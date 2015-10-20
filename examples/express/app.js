import express from 'express';
import path from 'path';
import infoServer from '../../src';
import stylus from 'stylus';

var app = express();

var port = process.env.PORT || 3000;

var rootDir = path.join(__dirname,'public');
var viewsDir = path.join(__dirname,'views');
var infoServerKey = '/meta';

var infoServerOptions = {
	adapter:false
,	persist:false
,	filters:[]
}

infoServer(rootDir,infoServerOptions).then(({middleware})=>{
	
	// set up
	app.set('port', port);
	app.set('views', viewsDir);
	app.set('view engine', 'jade');

	// routes
	app.use(stylus.middleware(rootDir));

	app.get('/',(req,res)=>{
		res.render('index',{
			title:'InfoServer Express Example'
		,	text:`append ${infoServerKey} to see metaData`
		,	key:infoServerKey
		});
	});

	app.use(infoServerKey,middleware);

	app.use(express.static(rootDir));

	// errors
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err,
			path:err.path
		});
	});

	var server = app.listen(app.get('port'), function() {
	  console.log('Express server listening on port ' + server.address().port);
	});
	
})

