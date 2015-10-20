import coerceGroup from './group';

export default function coerceGroups(args){
	return args.map(coerceGroup).filter(Boolean);
}