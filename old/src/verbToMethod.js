export default function verbToMethod(req){
	const {method} = req;
	switch(method.toLowerCase()){
		case 'copy':return ['copy',req.body]
		case 'put':return ['append',req.body]
		case 'post':return ['writeFile',req.body]
		case 'delete':return ['remove',req.body]
		case 'get':
		default:
			return ['getMetaRecursive',req.query]
	}
}