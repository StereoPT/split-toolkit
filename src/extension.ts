import * as vscode from 'vscode';
import commands, { setupTerminal } from './commands';
// const spawn = require('spawn-please');
// await spawn('colima', ['status']);

export function activate(context: vscode.ExtensionContext) {
	for (const [name, fn] of Object.entries(commands)) {
		context.subscriptions.push(vscode.commands.registerCommand(name, fn));
	}
}

export function deactivate() {}
