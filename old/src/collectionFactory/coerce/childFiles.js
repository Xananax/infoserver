import coerceFile from './fileId';

export default function coerceFiles(args){
	return args.map(coerceFile).filter(Boolean);
}