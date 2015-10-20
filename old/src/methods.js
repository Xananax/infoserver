import {F_OK,R_OK,W_OK,X_OK} from 'fs';

function toType(obj){
	return Object.prototype.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

const src = {
	name:'source'
,	description:'the source path of the operation'
,	valid_values:''
,	required:true
,	valid(arg){
		return (typeof args == 'string')
	}
}

const dest = {
	name:'destination'
,	description:'the destination path of the operation'
,	valid_values:''
,	required:true
,	valid(arg){
		return (typeof args == 'string')
	}
}

const uid = {
	name:'uid'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (
			(typeof args == 'number') ||
			(typeof args == 'string' && args.match(/\d+/))
		)
	}
}

const gid = {
	name:'gid'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (
			(typeof args == 'number') ||
			(typeof args == 'string' && args.match(/\d+/))
		)
	}
}

const mode = {
	name:'mode'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (
			(typeof args == 'number') ||
			(typeof args === 'string' && args.match(/([rwx\-]|[0-7])+/))
		)
	}
}

const realPathCache = {
	name:'cache'
,	description:''
,	valid_values:''
,	required:false
,	valid(args){
		return (toType(args) == 'object')
	}
}

const atime = {
	name:'atime'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (
			(typeof args == 'string' && args.match(/\d+/)) ||
			(typeof args == 'number') ||
			(args instanceof Date)
		)
	}
}

const mtime = {
	name:'mtime'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (
			(typeof args == 'string' && args.match(/\d+/)) ||
			(typeof args == 'number') ||
			(args instanceof Date)
		)
	}
}

const data = {
	name:'data'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (typeof args !== 'undefined');		
	}
}

const json = {
	name:'json'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (toType(args) == 'object')
	}
}

const len = {
	name:'len'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (
			(typeof args == 'number') ||
			(typeof args == 'string' && args.match(/\d+/))
		)
	}
,	coerce(args){
		return parseInt(args)
	}
}


function createMask(arr){
  var nMask = 0, nFlag = 0, nLen = arr.length > 32 ? 32 : arr.length;
  for (nFlag; nFlag < nLen; nMask |= arr[nFlag] << nFlag++);
  return nMask;
}

const accessMode = {
	name:'mode'
,	description:''
,	valid_values:''
,	required:true
,	valid(args){
		return (
			(typeof args == 'number') ||
			(typeof args == 'string' && args.match(/[frwx]+/))
		)
	}
,	coerce(args){
		if(typeof args == 'string'){
			return createMask(args.split('').map((letter)=>{
				if(letter == 'f'){return F_OK}
				if(letter == 'r'){return R_OK}
				if(letter == 'w'){return W_OK}
				if(letter == 'x'){return X_OK}
			}))
		}
		return args;
	}
}

function options(description,def){
	if(typeof description !== 'string'){
		var descriptionStr = '';
		for(var n in description){
			descriptionStr+=`${n}: (${toType(def[n])}) ${description[n]} Defaults to '${def[n]}'\n`;
		}
		description = descriptionStr;
	}
	return {
		name:'options'
	,	description
	,	defaults:def
	,	required:false
	,	coerce(args){
			return Object.assign({},def,args);
		}
}

export const methodsData = [
	copy:{
		name:'copy'
	,	description:'Copy a file or directory. The directory can have contents. Like cp -r.'
	,	args:[
			src
		,	dest
		,	options(
				{
					clobber:'(boolean) overwrite existing file or directory'
				,	preserveTimestamps: '(boolean) will set last modification and access times to the ones of the original source files, default is false.'
				,	filter: 'Function or RegExp to filter copied files. If function, return true to include, false to exclude. If RegExp, same as function, where filter is filter.test.'
				}
			,	{
					clobber:false
				,	preserveTimestamps:false
				,	filter:false
				}
			)
		]
	}
,	getMeta:{
		name:'getMeta'
	,	description:''
	,	args:[
			src
		,	options(''
				{
					lstat:''
				,	followSymLinks:''
				,	filters:''					
				}
			,	{
					lstat:true
				,	followSymLinks:true
				,	filters:[]
				}
			)
		]
	}
,	getMetaRecursive:{
		name:'getMetaRecursive'
	,	description:''
	,	args:[
			src
		,	options(
				{
					lstat:''
				,	'followSymLinks':''
				,	filters:''
				}
			,	{
					lstat:true
				,	followSymLinks:true
				,	filters:[]
				}
			)
		]
	}
,	emptyDir:{
		name:'emptyDir'
	,	description:'Ensures that a directory is empty. If the directory does not exist, it is created. The directory itself is not deleted.'
	,	args:[
			src
		]
	}
,	ensureFile:{
		name:'ensureFile'
	,	description:'Ensures that the file exists. If the file that is requested to be created is in directories that do not exist, these directories are created. If the file already exists, it is NOT MODIFIED.'
	,	args:[
			src
		]
	}
,	ensureDir:{
		name:'ensureDir'
	,	description:'Ensures that the directory exists. If the directory structure does not exist, it is created.'
	,	args:[
			src
		]
	}
,	ensureLink:{
		name:'ensureLink'
	,	description:'Ensures that the link exists. If the directory structure does not exist, it is created.'
	,	args:[
			src
		]
	}
,	ensureSymlink:{
		name:'ensureSymlink'
	,	description:'Ensures that the symlink exists. If the directory structure does not exist, it is created.'
	,	args:[
			src
		]
	}
,	mkdirs:{
		name:'mkdirs'
	,	description:'Creates a directory. If the parent hierarchy doesn't exist, it's created. Like mkdir -p.'
	,	args:[
			src
		]
	}
,	move:{
		name:'move'
	,	description:'Moves a file or directory, even across devices.'
	,	args:[
			src
		,	dest
		,	options(
				{
					clobber: '(boolean) overwrite existing file or directory'
				,	limit:'(number): number of concurrent moves'
				}
			,	{
					clobber:false
				,	limit:16
				}
			)
		]
	}
,	outputFile:{
		name:'outputFile'
	,	description:'Almost the same as writeFile (i.e. it overwrites), except that if the parent directory does not exist, it\'s created.'
	,	args:[
			src
		,	data
		]
	}
,	outputJson:{
		name:'outputJson'
	,	description:'Almost the same as writeJson, except that if the directory does not exist, it\'s created.'
	,	args:[
			src
		,	json
		]
	}
,	readJson:{
		name:'readJson'
	,	description:'Reads a JSON file and then parses it into an object.'
	,	args:[
			src
		]
	}
,	remove:{
		name:'remove'
	,	description:'Removes a file or directory. The directory can have contents. Like rm -rf'
	,	args:[
			src
		]
	}
,	writeJson:{
		name:'writeJson'
	,	description:'Writes an object to a JSON file'
	,	args:[
			src
		,	json
		]
	}
,	rename:{
		name:'rename'
	,	description:'renames a file, moving it between directories if required.'
	,	args:[
			src
		,	dest
		]
	}
,	truncate:{
		name:'truncate'
	,	description:'Cause the regular file named by path to be truncated to a size of precisely length bytes. If the file previously was larger than this size, the extra data is lost.  If the file previously was shorter, it is extended, and the extended part reads as null bytes ('\0'). The file offset is not changed.'
	,	args:[
			src
		,	len
		]
	}
,	chown:{
		name:'chown'
	,	description:'Change the owner and/or group of each FILE to OWNER and/or GROUP.'
	,	args:[
			src
		,	uid
		,	gid
		]
	}
,	lchown:{
		name:'lchown'
	,	description:'lchown is like chown, but does not dereference symbolic links.'
	,	args:[
			src
		]
	}
,	chmod:{
		name:'chmod'
	,	description:'chmod changes the file mode bits of each given file according to mode, which can be either a symbolic representation of changes to make, or an octal number representing the bit pattern for the new mode bits.'
	,	args:[
			src
		,	mode
		]
	}
,	lchmod:{
		name:'lchmod'
	,	description:'lchmod is like chmod, but does not dereference symbolic links.'
	,	args:[
			src
		,	mode
		]
	}
,	stat:{
		name:'stat'
	,	description:'return information about a file pointed to by buf.  No permissions are required on the file itself'
	,	args:[
			src
		]
	}
,	lstat:{
		name:'lstat'
	,	description:'lstat is identical to stat, except that if pathname is a symbolic link, then it returns information about the link itself, not the file that it refers to.'
	,	args:[
			src
		]
	}
,	link:{
		name:'link'
	,	description:'creates a new link (also known as a hard link) to an existing file.'
	,	args:[
			src
		,	dest
		]
	}
,	symlink:{
		name:'symlink'
	,	description:'creates a symbolic link named linkpath which contains the string target.'
	,	args:[
			src
		,	dest
		]
	}
,	readlink:{
		name:'readlink'
	,	description:'places the contents of the symbolic link pathname in the buffer buf, which has size bufsiz.  readlink() does not append a null byte to buf.  It will truncate the contents (to a length of bufsiz characters), in case the buffer is too small to hold all of the contents.'
	,	args:[
			src
		]
	}
,	realpath:{
		name:'realpath'
	,	description:'expands all symbolic links and resolves references to /./, /../ and extra '/' characters in the null-terminated string named by path to produce a canonicalized absolute pathname. The resulting path will have no symbolic link, /./ or /../ components.'
	,	args:[
			src
		,	realPathCache
		]
	}
,	unlink:{
		name:'unlink'
	,	description:'deletes a name from the filesystem.  If that name was the last link to a file and no processes have the file open, the file is deleted and the space it was using is made available for reuse.'
	,	args:[
			src
		]
	}
,	rmdir:{
		name:'rmdir'
	,	description:'Remove the DIRECTORY(ies), if they are empty.'
	,	args:[
			src
		]
	}
,	mkdir:{
		name:'mkdir'
	,	description:'attempts to create a directory named pathname.'
	,	args:[
			src
		,	mode
		]
	}
,	readdir:{
		name:'readdir'
	,	description:'list files in a directory'
	,	args:[
			src
		]
	}
,	utimes:{
		name:'utimes'
	,	description:'changes the access and modification times of the inode specified by filename to the actime and modtime fields of times respectively.'
	,	args:[
			src
		,	atime
		,	mtime
		]
	}
,	readFile:{
		name:'readFile'
	,	description:''
	,	args:[
			src
		,	options(
				{

				}
			,	{
					encoding:'utf8'
				,	flag:'r'
				}
			)
		]
	}
,	writeFile:{
		name:'writeFile'
	,	description:''
	,	args:[
			src
		,	data
		,	options(
				{

				}
			,	{
					encoding:'utf8'
				,	mode:0666
				,	flag:'r'
				}
			)
		]
	}
,	appendFile:{
		name:'appendFile'
	,	description:''
	,	args:[
			src
		,	data
		,	options(
				{

				}
			,	{
					encoding:'utf8'
				,	mode:0666
				,	flag:'a'
				}
			)
		]
	}
,	watchFile:{
		name:'watchFile'
	,	description:''
	,	args:[
			src
		,	options(
				{

				}
			,	{
					persistent:true
				,	interval: 5007
				}
			)
		,	'listener'
		]
	}
,	unwatchFile:{
		name:'unwatchFile'
	,	description:''
	,	args:[
			src
		,	'listener'
		]
	}
,	watch:{
		name:'watch'
	,	description:''
	,	args:[
			src
		,	options(
				{

				}
			,	{
					persistent:true
				,	recursive:false
				}
			)
		,	'listener'
		]
	}
,	access:{
		name:'access'
	,	description:''
	,	args:[
			src
		,	accessMode
		]
	}
]