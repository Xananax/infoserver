import coerce from '../coerce/groupId';
import validate from '../validate/groupId';

export default {
	name:'group'
,	description:'a group'
,	valid:'either a group name string, or an object with either `id` or `name` set'
,	validate
,	coerce
}