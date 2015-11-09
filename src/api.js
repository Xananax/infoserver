import Promise from 'bluebird';
import apido from 'apido';
import {boxed} from 'fs-meta';
import fsCommandsProps from 'fs-meta/lib/api/commands';
import selectionCommandsProps from './commands';
import memoryAdapterFactory from './memoryAdapter';
var debug = require('debug')('infoserver')

export default Promise.promisify(function makeAPI(rootdir,options,cb){

	debug('creating infoServer API')

	const fs = boxed(rootdir);

	const adapter = (options && options.adapter) || memoryAdapterFactory

	if(options){
		for(let name in options){
			debug(`option: ${name}:${options[name]}`)
		}
	}else{
		debug('no options')
	}

	adapter(fs,options).then(adapter=>
		apido({
			name:'selection'
		,	description:'Manages selections of files'
		,	default:'help'
		,	useJson:true
		,	commands:selectionCommandsProps.map(command=>command(adapter,fs))
		})
	)
	.then(selectionsApi=>[
		selectionsApi
	,	apido({
			name:'infoServer'
		,	description:'File system manager'
		,	useJson:true
		,	commands:fsCommandsProps.map(command=>command(fs,{}))
		})
	])
	.spread((selectionsApi,api)=>{
		fs.filters.push(function getSelection(meta,options,cb,fs){
			meta,selectionsApi.commands.get(['file',[meta.path]])
				.then(answer=>{
					meta.groups = answer.result.files[meta.path].parents;
					cb(null,meta);
				})
				.catch(err=>{
					meta.groups = [];
					cb(null,meta);
				})
		})
		api.nest(selectionsApi);
		api.selections = selectionsApi;
		debug('api ready')
		cb(null,api)
	})
	.error(cb)
})