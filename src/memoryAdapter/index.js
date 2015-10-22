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

	const persist = !!(opts && opts.persist)
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
			if(err){return cb(err);}
			try{
				fs.writeJson(filename,db,{encoding:'utf8'})
					.then(()=>cb())
					.error(cb);
			}catch(e){
				cb(e);
			}
		}
	}

	const save = persist ? saveFactory : noOp;

	const methods = {
		add(groupName,files,groups,cb){
			add(db,groupName,files,groups,save(cb))
		}
	,	addRoot(groups,cb){
			addRoot(db,groups,cb)
		}
	,	getFiles(files,cb){
			getFiles(db,files,cb)
		}
	,	getGroups(groups,cb){
			getGroups(db,groups,cb)
		}
	,	getRoot(cb){
			getRoot(db,cb)
		}
	,	remove(groupName,files,groups,cb){
			remove(db,groupName,files,groups,save(cb))
		}
	}

	if(persist){
		return fs.readJson(filename)
			.then(json=>{
				db.files = json.files;
				db.groups = json.groups;
				cb(null,methods);
			})
			.error(err=>{
				cb(null,methods);		
			})
	}

	cb(null,methods);

})