module.exports = function saneUrl(str){
	return str.replace(/^\/+|\/+$/g,'');
}