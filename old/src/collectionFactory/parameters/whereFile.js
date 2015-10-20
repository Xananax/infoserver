import coerce from '../coerce/fileId';
import validate from '../validate/fileId';

export default {
	name:'file'
,	description:'a file'
,	valid:'either a file path string, or an object with either `id` or `path` set'
,	validate
,	coerce
}