import valid from '../validate/files'
import coerce from '../validate/coerce'

export default {
	name:'files'
,	description:'an array of paths or objects with `path` property'
,	valid
,	coerce
}