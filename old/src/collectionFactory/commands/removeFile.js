import file from '../parameters/whereFile';

export default function makeRemoveFile(adapter){
	return {
		path:'remove'
	,	description:'removes a file from the database'
	,	parameters:[
			file
		]
	,	run({file},cb){
			const {id,path} = file;
			recursion = recursion || 0;
			if(id){
				adapter.removeFileById(id,recursion,cb);
			}
			else{
				adapter.removeFileByPath(path,recursion,cb);
			}
		}
	}
}