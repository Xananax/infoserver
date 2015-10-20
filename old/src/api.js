import fs,{makeAPI,filters} from 'fs-meta';
import infoToHeader from './infoToHeader';
import makeParseRequestFunction from './makeParseRequestFunction';
import collectionFactory from './collectionFactory';
import Promise from 'bluebird';

function prepareMiddleWare(api,collections,options){
	const {methods} = api;
	const middlewareType = (options && options.middlewareType) ? options.middlewareType : 'connect'
	const prefix = (options && options.headerPrefix) ? options.headerPrefix : 'xinfo-';
	const key = (options && options.key) ? options.key : 'info';
	const parseRequest = makeParseRequestFunction(methods);

	const middleware = (middlewareType == 'key')?
		function keyMiddleWare(req,res,next){
			const [command,args] = parseRequest(req);

			api.run(command,args)
			.then(result=>{
				req[key] = result;
				next();
			})
			.error(next);
		} :
		(middlewareType == 'headers') ?
			function headerMiddleware(req,res,next){
				const [command,args] = parseRequest(req);

				api.run(command,args)
				.then(result=>{
					infoToHeader(res,result,prefix)
					next();
				})
				.error(next);
			} :
			function middleware(req,res){
				const [command,args] = parseRequest(req);
				api.run(command,args)
				.then(result=>res.json(result))
				.error(err=>res.json(err))
			}
	;
	middleware.api = api;
	return middleware;
}

const makeMiddleWare = Promise.promisify(function makeMiddleWare(rootDir,options,cb){

	if(typeof options=='function'){
		cb = options;
		options = null;
	}

	fs.stat(rootDir)
	.then(stat=>stat.isDirectory()?
		collectionFactory(options) :
		new Error(`${rootDir} is not a valid directory`)
	)
	.then(collections=>makeAPI(rootDir,collections,options))
	.then(api=>prepareMiddleWare(api,options))
	.then(middleware=>cb(null,middleware))
	.error(cb)
	;
})

makeMiddleWare.filters = filters;

export default makeMiddleWare;
