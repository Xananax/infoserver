import validateName from './groupName'
import validatePath from './filePath';

export default function validate(args){
	return (
		validateName(args) || validatePath(args) ||
		Array.isArray(args) && args.every(arg=>(validateName(arg) || validatePath(arg)))
	)
}
