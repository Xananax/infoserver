export default function(db){
	return function addFiles(files,cb){
		files = db.files.insert(...files);
		cb(null,files);
	}
}