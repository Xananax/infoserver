import groupName from './parameters/groupName';
import files from './parameters/files';
import groups from './parameters/groups';

export default function addGroup(adapter){
	return {
		name:'add'
	,	description:'adds a group, or a file to a group'
	,	parameters:[
			groupName
		]
	,	optionalParameters:[			
			files
		,	groups
		]
	,	run({groupName,files,groups},cb){
			adapter.add(groupName,files,groups,cb);
		}
	}
}