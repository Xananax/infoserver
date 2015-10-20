export default function collectionAddFile(fs){
	return {
		name:'addFile'
	,	description:'adds a file'
	,	consume:':'
	,	parameters:[
			{
				name:'path'
			,	valid:'a string'
			,	validate(arg){
					
				}
			}
		]
	,	optionalParameters:[
			{
				name:'file_id'
			,	description:'a file id'
			}
		,	{
				name:'group_id'
			,	description:'a group id'
			}
		,	{
				name:'file_path'
			,	description:'a file path'
			}
		,	{
				name:'group_name'
			,	description:'a group name'
			}
		,	{
				name:'groups'
			,	description:'an array of group ids'
			}
		,	{
				name:'files'
			,	description:'an array of file ids'
			}
		]
	,	run({command,dest,clobber,preserveTimestamps,filter},cb){
			fs.copy(src,dest,{clobber,preserveTimestamps,filter})
				.then(result=>cb(null,result))
				.error(cb)
			;
		}
	}
}