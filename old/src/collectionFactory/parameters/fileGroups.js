import coerce from '../coerce/childGroups';
import validate from '../validate/childGroups';

export default {
	name:'groups'
,	description:'groups that reference the file'
,	valid:'array of group names or ids'
,	validate
,	coerce
}