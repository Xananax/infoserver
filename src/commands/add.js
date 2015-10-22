import groupName from './parameters/groupName';
import files from './parameters/files';
import groups from './parameters/groups';
import root from './parameters/root';

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
		,	root
		]
	,	run({groupName,files,groups,root},cb){
			adapter.add(groupName,files,groups,root,cb);
		}
	}
}