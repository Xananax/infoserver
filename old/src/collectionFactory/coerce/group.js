export default function coerce(arg){
	if(typeof arg == 'string'){
		arg = {name:arg};
	}
	if(!arg.groups){arg.groups = [];}
	if(!arg.files){arg.files = [];}
	return arg;
}