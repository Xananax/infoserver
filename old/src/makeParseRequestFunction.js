import verbToMethod from './verbToMethod';
import pathToMethod from './pathToMethod';

export default function makeParseRequestFunction(methods){
	return function parseRequest(req){
		const [defaultCommand,options] = verbToMethod(req);
		var [command,path] = pathToMethod(req.path,options,methods);
		
		if(!(methodName in methods)){return next();}
		const method = methods[methodName];
		if(!isRequestVerbValid(requestVerb,method.method)){
			return next();
		}
		const args = requestVerb == 'get' ? 
			method.map(path,req.query,req.body) : 
			method.map(path,req.body,req.query)
		;
		method(args).then(result=>res.json(result)).error(err=>res.json(err));
	}
}