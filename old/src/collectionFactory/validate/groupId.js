import {
	isUndefined
} from '../../utils';

export default function validGroup(arg){
	return (
		!isUndefined(arg) &&
		(
			(typeof arg === 'string' || typeof arg === 'number') ||
			('id' in arg) ||
			('name' in arg)
		)
	);
}