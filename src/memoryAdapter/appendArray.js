export default function addToArray(arr,items){
	if(!items || !items.length){return arr;}
	items = items.filter(item=>(arr.indexOf(item)<0))
	if(items.length){
		return arr.concat(items);
	}
	return arr;
}