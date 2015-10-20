import group from '../parameters/whereGroup';

export default function makeRemoveGroup(adapter){
	return {
		name:'remove'
	,	description:'removes a group from the database'
	,	parameters:[
			group
		]
	,	run({group},cb){
			const {id,name} = group;
			recursion = recursion || 0;
			if(id){
				adapter.removeGroupById(id,recursion,cb);
			}
			else{
				adapter.removeGroupByName(name,recursion,cb);
			}
		}
	}
}