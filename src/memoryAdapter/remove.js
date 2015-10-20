function deleteFiles(db,files){
	files.forEach(fileName=>{
		const index = db.files.paths[fileName];
		db.files.items.splice(index,1);
		delete db.files.paths[fileName];
	})
}

function deleteGroups(db,groups){
	groups.forEach(groupName=>{
		const index = db.groups.names[groupName];
		db.groups.items.splice(index,1);
		delete db.groups.names[groupName];
		db.files.items = db.files.items.map(file=>{
			const groupIndex = file.parents.indexOf(groupName);
			if(groupIndex>=0){
				file.parents.splice(groupIndex,1);
				if(!file.parents.length){
					deleteFiles(db,[file.path]);
					return false;
				}
			}
			return file;
		}).filter(Boolean);
	})
}

function removeGroups(db,groups,remove){
	deleteGroups(db,remove);
	return groups.filter(groupName=>remove.indexOf(groupName)<0)
}

function removeFiles(db,files,remove){
	deleteFiles(db,remove);
	return files.filter(fileName=>remove.indexOf(fileName)<0)
}

export default function remove(db,groupName,files,groups,cb){

	if(!(groupName in db.groups.names)){
		return cb(new Error(`group ${name} does not exist`));
	}


	if((!groups || !groups.length) && (!files || !files.length)){
		deleteGroups(db,[groupName]);
		return cb();
	}

	const group = db.groups.items[db.groups.names[groupName]];

	if(groups && groups.length){
		group.groups = removeGroups(db,group.groups,groups);
	}
	if(files && files.length){
		group.files = removeFiles(db,group.files,files);
	}
	return cb(null,group)
}