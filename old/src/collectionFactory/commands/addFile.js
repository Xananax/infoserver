import groups from '../parameters/fileGroups';
import file from '../parameters/file';

export default function makeAddFile(adapter){
	return {
		name:'addFile'
	,	description:'adds a file to the database'
	,	consume:':'
	,	parameters:[
			file
		]
	,	optionalParameters:[
			groups
		]
	,	run({file,groups},cb){
			file.groups = file.groups.concat(groups);
			adapter.addFile(file,cb);
		}
	}
}