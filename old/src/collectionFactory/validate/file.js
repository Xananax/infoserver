export default function validateFile(arg){
	return (typeof arg == 'string') || arg && ('path' in arg)
}