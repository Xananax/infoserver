import groups from '../parameters/fileGroups';
import files from '../parameters/files';

export default function makeAddFile(adapter){
	return {
		name:'addFiles'
	,	description:'adds multiple files to the database'
	,	consume:':'
	,	parameters:[
			files
		]
	,	optionalParameters:[
			groups
		]
	,	run({files,groups},cb){
			if(groups && groups.length){
				files = files.map(file=>{
					file.groups = file.groups.concat(groups);
				});
			}
			adapter.addFiles(files,cb);
		}
	}
}