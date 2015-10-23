var debug = require('debug')('infoserver:memoryAdapter')
import add from './add'
import addRoot from './addRoot'
import getFiles from './getFiles'
import getGroups from './getGroups'
import getRoot from './getRoot'
import remove from './remove'
import Promise from 'bluebird';

function noOp(cb){
	return cb;
}

export default Promise.promisify(function memoryAdapterFactory(fs,opts,cb){

	debug('using memory adapter')

	const persist = (opts && opts.persist)
	const filename = (persist)?
		((typeof opts.persist === 'string') ? opts.persist : 'db.json') : 
		false
	;

	const db = {
		files:{
			items:[]
		,	paths:{}
		}
	,	groups:{
			items:[]
		,	names:{}
		}
	}

	function saveFactory(cb){
		return function save(err,answer){
			debug('saving...')
			if(err){return cb(err);}
			try{
				fs.writeJson(filename,db,{encoding:'utf8'})
					.then(()=>{
						debug('database saved')
						cb()
					})
					.catch(err=>{
						debug('error saving database')
						cb(err)
					});
			}catch(e){
				debug('error saving database')
				debug(e)
				cb(e);
			}
		}
	}

	const save = persist ? saveFactory : noOp;

	if(!persist){
		debug('no persistence set, database will not be saved')
	}else{
		debug('persistence on, saving to %s',filename)
	}

	const methods = {
		add(groupName,files,groups,root,cb){
			debug('add')
			add(db,groupName,files,groups,root,save(cb))
		}
	,	addRoot(groups,cb){
			debug('getGroups')
			addRoot(db,groups,save(cb))
		}
	,	getFiles(files,cb){
			debug('getFiles')
			getFiles(db,files,cb)
		}
	,	getGroups(groups,cb){
			debug('getGroups')
			getGroups(db,groups,cb)
		}
	,	getRoot(cb){
			debug('getRoot')
			getRoot(db,cb)
		}
	,	remove(groupName,files,groups,cb){
			debug('remove')
			remove(db,groupName,files,groups,save(cb))
		}
	}

	if(persist){
		fs.readJson(filename)
			.then(json=>{
				debug('database loaded');
				db.files = json.files;
				db.groups = json.groups;
				cb(null,methods);
			})
			.catch(err=>{
				debug('database not found or not writeable. Trying to save');
				save((err=>{
					if(err){return cb(err);}
					return cb(null,methods);
				}))();
			});
		return;
	}

	cb(null,methods);

})