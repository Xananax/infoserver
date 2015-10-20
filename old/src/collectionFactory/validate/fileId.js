import {
	isUndefined
} from '../../utils';

export default function validFile(arg){
	return (
		!isUndefined(arg) &&
		(
			(typeof arg === 'string' || typeof arg === 'number') ||
			('id' in arg) ||
			('path' in arg)
		)
	);
}