import valid from '../validate/group';
import coerce from '../coerce/group';

export default 	{
	name:'group'
,	description:'either a group name, or a group object with at least a name property'
,	valid
,	coerce
}