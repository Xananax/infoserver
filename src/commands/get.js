import type from './parameters/type';
import items from './parameters/items';
import all from './parameters/all';

function getGroupNormal(adapter,type,items,cb){
	if(type && (items && items.length)){
		if(type==='file'){
			return adapter.getFiles(items,cb)
		}
		if(type==='group'){
			return adapter.getGroups(items,cb)
		}
	}else{
		return adapter.getRoot(cb);
	}
}

function getGroupRecursive(adapter,type,items,cb){
	getGroupNormal(adapter,type,items,(err,result)=>{
		const {groups,files} = result;
		const groupKeys = Object.keys(groups)
		function next(){

		}
		cb(err,result);
	})
}

export default function addGroup(adapter){
	return {
		name:'get'
	,	description:'retrieves files, groups, or root groups'
	,	parameters:[
			type
		]
	,	optionalParameters:[
			items
		,	all
		]
	,	run({type,items,all},cb){
			return getGroupNormal(adapter,type,items,cb);
		}
	}
}