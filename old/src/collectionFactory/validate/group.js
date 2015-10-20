export default function valid(arg){
	return (typeof arg == 'string') || arg && ('name' in arg)
}