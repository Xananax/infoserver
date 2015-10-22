export default function validate(arg){
	return (
		(typeof arg == 'boolean') ||
		(typeof arg == 'number') ||
		(typeof arg == 'string' && /true|yes|false|no|1|0/.test(arg))
	)
}