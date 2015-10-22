export default function coerce(args){
	return ((typeof args == 'boolean') ? args :
		(typeof args == 'string' && /true|yes/i.test(args)) ||
		(typeof args == 'number' && args > 0) ||
		false
	);
}