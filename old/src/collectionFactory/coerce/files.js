import coerceFile from './file';

export default function coerceFiles(args){
	return args.map(coerceFile).filter(Boolean);
}