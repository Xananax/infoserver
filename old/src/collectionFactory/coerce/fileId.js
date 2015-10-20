export default function coerceFile(file){
	if(typeof file === 'string' || typeof file === 'number'){
		return {id:file};
	}
	return file;
}