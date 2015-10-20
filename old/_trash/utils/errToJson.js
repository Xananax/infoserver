module.exports = function errorToJson(err){
	return {
		name:err.name
	,	message:err.message
	,	stack:err.stack.split(/\n/)
	}
}