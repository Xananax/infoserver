export default function(db){
	return function addFile(file,cb){
		file = db.files.insert(file)
		cb(null,file);
	}
}