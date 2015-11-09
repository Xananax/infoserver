import getGroup from './getGroup';
import {getFiles} from './getFiles';

function arrToMap(name,arr){
	const obj = {};
	arr.forEach(item=>{obj[item[name]] = item;})
	return obj
}

export function getGroups(db,groups,ret,cb){
	const {length} = groups;
	var i = 0;

	(function next(err){
		if(err){return cb(err);}
		if(i>=length){return cb(null,ret)}
		var groupName = groups[i++];
		if(groupName in ret.groups){return next();}
		function _getFiles(group,cb){
			if(group.files && Array.isArray(group.files) && group.files.length){
				const _files = group.files.filter(fileName=>!(fileName in ret.files));
				return getFiles(db,_files,ret,next)
			}
			return cb()
		}
		function _getGroups(group,cb){
			if(group.groups && Array.isArray(group.groups) && group.groups.length){
				const _groups = group.groups.filter(groupName=>!(groupName in ret.groups));
				return getGroups(db,_groups,ret,next)
			}
			return cb();
		}
		getGroup(db,groupName,(err,group)=>{
			if(err){return next(err);}
			ret.groups[groupName] = Object.assign({},group);
			_getGroups(group,_getFiles(group,next))
		})
	})();
}


function processObj(obj){
	const indexes = {}
	const items = []
	Object.keys(obj).forEach(key=>{
		const item = obj[key];
		getIndex(item,key,indexes,items)
		item.groups && item.groups.forEach(skey=>getIndex(obj[skey],skey,indexes,items))
	})

	return {indexes,items,obj}
}

function getIndex(item,key,indexes,items){
	indexes[key] = items.push(item) -1;
}

export default function getGroupsWithoutCache(db,groups,cb){
	const ret = {
		groups:{}
	,	files:{}
	};
	getGroups(db,groups,ret,(err,result)=>{
		if(err){return cb(err);}
		cb(null,result);
	});
}