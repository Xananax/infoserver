import groups from '../parameters/fileGroups';
import path from '../parameters/filePath';
import id from '../parameters/id';
import replace from '../parameters/replace';

export default function makeEditFile(adapter){
	return {
		name:'editFile'
	,	description:'edits a file in the database'
	,	consume:':'
	,	parameters:[
			id
		]
	,	optionalParameters:[
			path
		,	groups
		,	replace
		]
	,	run({id,path,groups,replace},cb){
			const file = {id,path,groups};
			adapter.editFile(file,replace,cb);
		}
	}
}