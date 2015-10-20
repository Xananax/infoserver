import coerceGroup from './groupId';

export default function coerceGroups(args){
	return args.map(coerceGroup).filter(Boolean);
}