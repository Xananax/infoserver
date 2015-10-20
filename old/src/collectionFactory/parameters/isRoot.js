import validate from '../validate/boolean';
import coerce from '../coerce/boolean';

export default {
	name:'root'
,	description:'if truthy, the group will be added to the root groups'
,	valid:'true, false, 1, 0, "true", "false"'
,	default:false
,	validate
,	coerce
}