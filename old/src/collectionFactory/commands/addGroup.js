import groups from '../parameters/groupGroups';
import files from '../parameters/groupFiles';
import group from '../parameters/group';
import isRoot from '../parameters/isRoot';

export default function makeAddGroup(adapter){
	return {
		name:'addGroup'
	,	description:'adds a group to the database'
	,	consume:':'
	,	parameters:[
			group
		]
	,	optionalParameters:[
			groups
		,	files
		,	isRoot
		]
	,	run({group,groups,files,root},cb){
			group.groups = group.groups.concat(groups);
			group.files = group.files.concat(files);
			adapter.addGroup(group,root,cb);
		}
	}
}