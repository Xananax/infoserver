import Loki from 'lokijs'
import {
	addFile 
,	addFiles 
,	addGroup 
,	editFile 
,	editGroup 
,	getFileById 
,	getFileByPath 
,	getGroupById 
,	getGroupByName 
,	getRoot 
,	removeFileById 
,	removeFileByPath 
,	removeGroupById 
,	removeGroupByName 
} from './methods';

var originalMethods = {
	addFile 
,	addFiles 
,	addGroup 
,	editFile 
,	editGroup 
,	getFileById 
,	getFileByPath 
,	getGroupById 
,	getGroupByName 
,	getRoot 
,	removeFileById 
,	removeFileByPath 
,	removeGroupById 
,	removeGroupByName 
}


function loadOrCreateDb(filename,cb){

	const lokiDb = new Loki(filename);
	
	if(!filename){
		return cb(null,{
			files: db.addCollection('files')
		,	groups: db.addCollection('groups')
		})
	}


	lokiDb.loadDatabase({},(err)=>{
		if(err){
			const files = db.addCollection('files');
			const groups = db.addCollection('groups');
			lokiDb.saveDatabase((err)=>{
				if(err){return cb(err)}
				cb(null,{files,groups});
			});
			return;
		}
		const files = lokiDb.getCollection('files')
		const groups = lokiDb.getCollection('groups')
		return cb(null,{files,groups})
	})	

}

export default function memoryAdapter(filename,cb){

	loadOrCreateDb(filename,(err,db)=>{
		if(err){return cb(err);}
		const methods = {}
		originalMethods.keys().forEach(name=>{
			methods[name] = originalMethods[name](db);
		})
		cb(null,methods);
	})

}
