import validateName from './groupName'

export default function validate(args){
	return (
		validateName(args) ||
		Array.isArray(args) && args.every(arg=>validateName)
	)
}
