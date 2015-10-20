import validateFile from './fileId'

export default function validateFiles(files){
	if(!Array.isArray(files)){return false;}
	const {length} = files;
	var i = 0
	while(i<length){
		if(!validateFile(files[i++])){return false;}
	}
	return true;
}