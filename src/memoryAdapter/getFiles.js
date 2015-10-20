import getFile from './getFile';
import {getGroups} from './getGroups';

function arrToMap(name,arr){
	const obj = {};
	arr.forEach(item=>{obj[item[name]] = item;})
	return obj
}

export function getFiles(db,files,ret,cb){
	const {length} = files;
	var i = 0;
	(function next(err){
		if(err){return cb(err);}
		if(i>=length){return cb(null,ret)}
		var fileName = files[i++];
		if(fileName in ret.files){return next();}
		function _getGroups(file,cb){
			if(file.groups && Array.isArray(file.groups) && file.groups.length){
				const _groups = file.groups.filter(groupName=>!(groupName in ret.groups));
				return getGroups(db,_groups,ret,next)
			}
			return cb();
		}
		getFile(db,fileName,(err,file)=>{
			if(err){return next(err);}
			ret.files[fileName] = Object.assign({},file);
			_getGroups(file,next)
		})
	})();
}

export default function getFilesWithoutCache(db,files,cb){
	const ret = {
		groups:{}
	,	files:{}
	};
	getFiles(db,files,ret,cb);
}