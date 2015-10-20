import validatePath from './filePath';

export default function validate(args){
	return (
		validatePath(args) ||
		Array.isArray(args) && args.every(arg=>validatePath)
	)
}