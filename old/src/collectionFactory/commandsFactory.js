import {
	addFile
,	addGroup
,	editFile
,	editGroup
,	getFile
,	getGroup
,	removeFile
,	removeGroup
,	getRoot
} from './commands'

const commands = [
	addFile
,	addGroup
,	editFile
,	editGroup
,	getFile
,	getGroup
,	removeFile
,	removeGroup
,	getRoot
]

export default function commandFactory(adapter,options){
	return commands.map(command=>command(adapter,options))
}