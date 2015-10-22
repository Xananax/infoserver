import groups from './parameters/groups';

export default function addRoot(adapter){
	return {
		name:'root'
	,	description:'adds groups to the root group'
	,	parameters:[]
	,	optionalParameters:[
			groups
		]
	,	run({groups},cb){
			if(groups && groups.length){
				return adapter.addRoot(groups,cb);
			}else{
				return adapter.getRoot(cb);
			}
		}
	}
}