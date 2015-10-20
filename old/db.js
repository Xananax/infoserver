import equal from 'deep-equal';
import extend from 'node.extend';

const db = {
	objects:[]
,	parentRefs:{}
,	childrenRefs:{}
,	collections:{}
}

var db_ids = 0;

function createSchema(props){
	const schema = {
		id(id){
			if(typeof id == 'undefined'){
				return db_ids++;
			}
			return 0;
		}
	};
	for(var name in props){
		var val = props[name];
		if(typeof val == 'function'){
			schema[name] = val;
		}
		else if(/^has/.test(val)){
			let [relation,collectionName] = val.split(':');
			if(/hasmany/i.test(relation)){
				
			}
			else if(/hasone/i.test(relation)){

			}
		}
		else{
			schema[name] = function(arg){
				if(typeof arg == 'undefined'){return val;}
				return arg;
			}
		}
	}
}

function createCollection(schema,indexesArray){
	const ids = {}
	const indexes = {ids};
	const items = [];
	const collection = {indexes,items,schema}
	db.collections = collection;
	if(indexesArray){
		if(Array.isArray(indexesArray)){
			indexesArray.forEach(index=>addIndex(collection,index))
		}else{
			addIndex(collection,indexesArray);
		}
	}
	return collection;
}

function addIndex(collection,indexName){
	const index = {};
	collection.indexes[indexName] = index;
}

function addDocument(collection,doc){
	const index = db.objects.push(doc) - 1;
	collection.items.push(index);
	if(!doc.id){doc.id = index;}
	Object.prototype.ownKeys.call(doc).forEach(key=>{
		if(key in collection.indexes){
			let val = doc[key];
			if(val in collection.indexes[key]){
				throw new Error(`${key} is not unique`);
			}
			if(typeof val === 'undefined'){
				throw new Error(`${key} cannot be undefined`);
			}
			collection.indexes[key][val] = index;
		}
	});
}

function generateWhere(where){
	const keys = Object.prototype.ownKeys.call(where);
	const {length} = keys;
	function generatedWhere(doc){
		for(let i = 0; i < length; i++){
			const key = keys[i];	
			const value = doc[key];
			const predicate = where[key];
			if(predicate instanceof RegExp){
				if(!predicate.test(value)){return false;}
				continue;
			}
			if(typeof predicate == 'function'){
				if(!predicate(val)){return false;}
				continue;
			}
			return equal(predicate,val);	
		}
	}
}

function populate(doc){

}

function addChild(parentCollection,parent,childCollection,...children){
	return parentCollection.items.map(index=>db.objects[index]).
}

function getDocument(collection,where){
	where = (typeof where !== 'function')? where : generatedWhere(where);
	return collection.items.map(index=>db.objects[index]).filter(where);
}

function editDocument(collection,where,props,merge){
	
}