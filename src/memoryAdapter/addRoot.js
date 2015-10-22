import getOrCreateGroup from './getOrCreateGroup'
import appendArray from './appendArray';

export default function addRoot(db,groups,cb){
	const rootGroup = getOrCreateGroup(db,'root');
	const groupsNames = groups.map(name=>{
		const group = getOrCreateGroup(db,name);
		group.root = true;
		return name;
	});
	rootGroup.groups = appendArray(rootGroup.groups,groupsNames);
	return cb(null,rootGroup);
}