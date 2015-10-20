import groupName from './parameters/groupName';
import files from './parameters/files';
import groups from './parameters/groups';

export default function removeGroup(adapter){
	return {
		name:'remove'
	,	description:'removes a group'
	,	parameters:[
			groupName
		]
	,	optionalParameters:[			
			files
		,	groups
		]
	,	run({groupName,files,groups},cb){
			adapter.remove(groupName,files,groups,cb)
		}
	}
}