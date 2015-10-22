import validate from './validate/root';
import coerce from './coerce/root';

export default {
	name:'root'
,	description:'if true, the group will be added to the root group'
,	valid:'boolean'
,	validate
,	coerce	
}