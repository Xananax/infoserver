export default function validate(arg){
	return (typeof arg === 'string' && /group?|file?/i.test(arg))
}