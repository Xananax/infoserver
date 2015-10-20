require('babel/register');
var express = require('express');
var path = require('path');
var app = express();
var infoServerOptions = {
	rootDir: path.resolve(__dirname+'../../..')
,   key: 'xinfo'
,   middlewareType: 'connect'
,   headerPrefix:'xinfo-'
}
var port = process.env.PORT || 3000;
var infoServer = require('../../src')(infoServerOptions.rootDir,infoServerOptions)
.then(function(infoServerMiddleware){
	
	// set up
	app.set('port', port);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');

	// routes
	app.use(require('stylus').middleware(path.join(__dirname, 'public')));
	app.get('/',function(req,res){
		res.render('index',{title: 'InfoServer Express Example'});
	});

	app.use('/meta',infoServerMiddleware);

	app.use(express.static(path.join(__dirname, 'public')));

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

