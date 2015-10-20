export default function coerce(arg){
	if(arg === true || arg > 0 || /true/i.test(arg)){
		return true;
	}
	return false;
}