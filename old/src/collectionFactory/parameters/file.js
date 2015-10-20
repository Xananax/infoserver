import valid from '../validate/file'
import coerce from '../coerce/file'

export default {
	name:'file'
,	description:'either a file path, or a file object with at least a path property'
,	valid
,	coerce
}