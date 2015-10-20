export default function isInteger(arg){
	return (typeof arg == 'number' || !isNaN(parseInt(arg)))
}