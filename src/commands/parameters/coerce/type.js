export default function coerce(args){
	return /file?/i.test(args) ? 'group' : 'file'
}