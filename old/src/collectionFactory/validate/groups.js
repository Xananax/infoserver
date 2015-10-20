import validateGroup from './group'

export default function validateGroups(groups){
	if(!Array.isArray(groups)){return false;}
	const {length} = groups;
	var i = 0
	while(i<length){
		if(!validateGroup(groups[i++])){return false;}
	}
	return true;
}