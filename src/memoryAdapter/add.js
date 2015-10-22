import getOrCreateGroup from './getOrCreateGroup';
import appendArray from './appendArray';
import addRoot from './addRoot';

function getOrCreateFile(db,path){
	if(!(path in db.files.paths)){
		db.files.paths[path] = db.files.items.push({
			path
		,	parents:[]
		}) -1 ;
	}
	return db.files.items[db.files.paths[path]];
}

export default function add(db,groupName,files,groups,root,cb){
	const group = getOrCreateGroup(db,groupName);
	if(groups && groups.length){
		groups = groups.map(childGroupName=>{
			if(childGroupName == groupName){return false;}
			const childGroup = getOrCreateGroup(db,childGroupName);
			childGroup.parents = appendArray(childGroup.parents,[groupName]);
			return childGroupName;
		}).filter(Boolean)
	}
	if(files && files.length){
		files = files.map(fileName=>{
			const file = getOrCreateFile(db,fileName);
			file.parents = appendArray(file.parents,[groupName]);
			return fileName;
		}).filter(Boolean)
	}
	group.groups = appendArray(group.groups,groups);
	group.files = appendArray(group.files,files);
	if(root){
		addRoot(db,[groupName],(err)=>{
			if(err){return cb(err);}
			cb(null,group);
		})
	}
	return cb(null,group)
}