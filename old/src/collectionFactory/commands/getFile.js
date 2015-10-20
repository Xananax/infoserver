import file from '../parameters/whereFile';
import recursion from '../parameters/recursion';

export default function makeGetFile(adapter){
	return {
		path:'get'
	,	description:'gets a file in the database'
	,	consume:':'
	,	parameters:[
			file
		]
	,	optionalParameters:[
			recursion
		]
	,	run({file,recursion},cb){
			const {id,path} = file;
			recursion = recursion || 0;
			if(id){
				adapter.getFileById(id,recursion,cb);
			}
			else{
				adapter.getFileByPath(path,recursion,cb);
			}
		}
	}
}