import Promise from 'bluebird'
import commandsFactory from './commandsFactory';
import {isFunction} from '../utils';
import memoryAdapter from '../adapters/memory';

export default Promise.promisify(function makeAPI(options,cb){

	if(isFunction(options)){
		cb = options;
		options = null;
	}

	if(!adapter){return cb(new Error('adapter argument is needed'));}

	const commands = commandsFactory(adapter,options);

	apido({
		name:'collections'
	,	description:'manages '
	,	commands
	})
	.then(api=>{
		cb(null,api);
	})
	.error(cb)
	
})