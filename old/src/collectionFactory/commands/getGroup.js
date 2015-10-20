import group from '../parameters/group';
import recursion from '../parameters/recursion';

export default function makeGetGroup(adapter){
	return {
		name:'get'
	,	description:'gets a group in the database'
	,	consume:':'
	,	parameters:[
			group
		]
	,	optionalParameters:[
			recursion
		]
	,	run({group,recursion},cb){
			const {id,name} = group;
			recursion = recursion || 0;
			if(id){
				adapter.getGroupById(id,recursion,cb);
			}
			else{
				adapter.getGroupByName(name,recursion,cb);
			}
		}
	}
}