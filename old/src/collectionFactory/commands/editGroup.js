import groups from '../parameters/groupGroups';
import files from '../parameters/groupFiles';
import name from '../parameters/groupName';
import id from '../parameters/id';
import replace from '../parameters/replace';
import isRoot from '../parameters/isRoot';

export default function makeEditGroup(adapter){
	return {
		name:'editGroup'
	,	description:'edits a group in the database'
	,	consume:':'
	,	parameters:[
			id
		]
	,	optionalParameters:[
			name
		,	groups
		,	files
		,	isRoot
		,	replace
		]
	,	run({id,name,files,groups,root,replace},cb){
			const group = {id,name,files,groups};
			adapter.editGroup(group,root,replace,cb);
		}
	}
}