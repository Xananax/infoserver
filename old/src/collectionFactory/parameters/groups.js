import valid from '../validate/groups'
import coerce from '../validate/coerce'

export default {
	name:'groups'
,	description:'an array of names or objects with `name` property'
,	valid
,	coerce
}