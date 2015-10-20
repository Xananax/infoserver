export default function coerceGroup(group){
	if(typeof group === 'string' || typeof group === 'number'){
		return {id:group};
	}
	return group;
}