import { ExtensionContext, commands } from 'vscode';
import splitCommand from './commands';

// const spawn = require('spawn-please');
// await spawn('colima', ['status']);

export function activate(context: ExtensionContext) {
	context.subscriptions.push(commands.registerCommand(splitCommand.name, splitCommand.fn));
}

export function deactivate() {}
