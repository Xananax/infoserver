export default function coerce(args){
	return (
		((typeof args == 'string') && args.split(',').filter(Boolean)) ||
		(Array.isArray(args) ? args : [])
	)
}