export default function coerceFile(arg){
	if(typeof arg == 'string'){
		arg = {path:arg};
	}
	if(!arg.groups){arg.groups = [];}
	return arg;
}