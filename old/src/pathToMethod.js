function attachFalseCommand(command,arg,char){
	return arg? `${command}${char}${arg}` : `${command}`
}

function cleanStr(str){
	return str.replace(/^\//,'')
}

const commandSep_default = /\/(.+)/;
const argsSep_default = /:/;
const commandChar_default = '/';

export default function makePathToMethod(commandSep,argsSep){
	var commandChar = commandSep ? commandSep : commandChar_default;
	commandSep = commandSep ? new RegExp(commandSep+'(.+)') : commandSep_default
	;
	argsSep = argsSep ? new RegExp(argsSep) : argsSep_default
	;
	return function pathToMethod(path,options,methods){
		var command;
		var [tentativeCommand,args] = cleanStr(path)
			.split(commandSep)
			.slice(0,2);
		args = args.split(argsSep)//.map(cleanStr);
		if(options && options.method){
			if(!methods || (methods && (options.method in methods))){
				command = options.method;
				args[0] = attachFalseCommand(tentativeCommand,args[0],commandChar);
			}
		}
		if(!command){	
			if(methods && !(tentativeCommand in methods)){
				args[0] = attachFalseCommand(tentativeCommand,args[0],commandChar);
			}else{
				command = tentativeCommand;
			}
		}
		return [command,args];
	}
}