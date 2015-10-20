import validate from './validate/items';
import coerce from './coerce/items';

export default {
	name:'items'
,	description:'group names or files paths'
,	valid:'array'
,	validate
,	coerce	
}