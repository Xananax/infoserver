import validate from './validate/type';
import coerce from './coerce/type';

export default {
	name:'type'
,	description:'type of item to retrieve'
,	valid:'"group" or "file"'
,	validate
,	coerce	
}