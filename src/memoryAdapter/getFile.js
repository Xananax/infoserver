export default function getFile(db,path,cb){
	if(!(path in db.files.paths)){
		return cb(new Error(`file ${path} does not exist`));
	}
	return cb(null,db.files.items[db.files.paths[path]]);
}