function getOrCreateGroup(db,name){
	if(!(name in db.groups.names)){
		db.groups.names[name] = db.groups.items.push({
			name
		,	files:[]
		,	groups:[]
		}) -1 ;
	}
	return db.groups.items[db.groups.names[name]];
}

function getOrCreateFile(db,path){
	if(!(path in db.files.paths)){
		db.files.paths[path] = db.files.items.push({
			path
		,	parents:[]
		}) -1 ;
	}
	return db.files.items[db.files.paths[path]];
}

function addToArray(arr,items){
	if(!items || !items.length){return arr;}
	items = items.filter(item=>(arr.indexOf(item)<0))
	if(items.length){
		return arr.concat(items);
	}
	return arr;
}

export default function add(db,groupName,files,groups,cb){
	const group = getOrCreateGroup(db,groupName);
	if(groups && groups.length){
		groups = groups.map(childGroupName=>{
			if(childGroupName == groupName){return false;}
			const childGroup = getOrCreateGroup(db,childGroupName);
			childGroup.parents = addToArray(childGroup.parents,[groupName]);
			return childGroupName;
		}).filter(Boolean)
	}
	if(files && files.length){
		files = files.map(fileName=>{
			const file = getOrCreateFile(db,fileName);
			file.parents = addToArray(file.parents,[groupName]);
			return fileName;
		}).filter(Boolean)
	}
	group.groups = addToArray(group.groups,groups);
	group.files = addToArray(group.files,files);
	return cb(null,group)
}