import validate from '../validate/boolean';
import coerce from '../coerce/boolean';

export default {
	name:'replace'
,	description:'if truthy, the new object will replace the old one. If falsy, the '
,	valid:'true, false, 1, 0, "true", "false"'
,	default:true
,	validate
,	coerce
}