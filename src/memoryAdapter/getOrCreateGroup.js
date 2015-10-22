export default function getOrCreateGroup(db,name){
	if(!(name in db.groups.names)){
		db.groups.names[name] = db.groups.items.push({
			name
		,	files:[]
		,	groups:[]
		}) -1 ;
	}
	return db.groups.items[db.groups.names[name]];
}