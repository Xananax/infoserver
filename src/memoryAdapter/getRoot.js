import {getGroups} from './getGroups';

export default function getRoot(db,cb){
	const ret = {
		groups:{}
	,	files:{}
	};
	getGroups(db,['root'],ret,cb);
}