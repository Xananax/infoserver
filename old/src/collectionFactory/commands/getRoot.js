export default function makeGetRoot(adapter){
	return {
		name:'getRoot'
	,	description:'gets the root groups'
	,	parameters:[]
	,	optionalParameters:[
			recursion
		]
	,	run({recursion},cb){
			recursion = recursion || 0;
			adapter.getRoot(recursion,cb);
		}
	}
}