import type from './parameters/type';
import items from './parameters/items';

export default function addGroup(adapter){
	return {
		name:'get'
	,	description:'retrieves files, groups, or root groups'
	,	parameters:[
			type
		]
	,	optionalParameters:[
			items
		]
	,	run({type,items},cb){
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
	}
}