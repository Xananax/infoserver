function isPlainObject(o) {
     return (Object(o) === o && Object.getPrototypeOf(o) === Object.prototype);
}

function flattenObj(obj,target,prefix){
	for(var key in obj){
		var current = obj[key];
		if(typeof current == 'function'){
			continue;
		}
		if(Array.isArray(current) || isPlainObject(current)){
			flattenObj(current,target,prefix+'.'+key);
			continue;
		}
		if(current instanceof Date){
			current = current.getTime() / 1000 | 0;
		}
		target[prefix+'.'+key] = current;
	}
}

function infoToHeader(res,stats,prefix){
	var obj = {};
	flattenObj(stats,obj,prefix);
	for(var n in obj){
		res.setHeader(n,obj[n]);
	}
}

module.exports = infoToHeader;