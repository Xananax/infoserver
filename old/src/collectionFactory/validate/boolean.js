export default function validateBool(arg){
	return arg === true || arg === false || arg === 0 || arg === 1 || /true|false/i.test(arg);
}