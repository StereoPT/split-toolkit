import * as vscode from 'vscode';

const setupTerminal = () => {
	let splitTerminal = vscode.window.activeTerminal;

	if(!splitTerminal) {
		splitTerminal = vscode.window.createTerminal("Split");
		splitTerminal.show();
	}

	return splitTerminal;
}

export function activate(context: vscode.ExtensionContext) {

	const SplitUP = () => {
		const splitTerminal = setupTerminal();

		// Check before things START to avoid Double Up
		splitTerminal.sendText('colima start');
		splitTerminal.sendText('docker-compose up -d mongo mongo2 redis');
		vscode.window.showInformationMessage('Split Up!');
	}

	const SplitDOWN = () => {
		const splitTerminal = setupTerminal();
		
		// Check before things STOP to avoid Double Down
		splitTerminal.sendText('docker-compose stop mongo mongo2 redis');
		splitTerminal.sendText('colima stop');
		vscode.window.showInformationMessage('Split Down!');
	}
	
	context.subscriptions.push(vscode.commands.registerCommand('split-toolkit.split-up', SplitUP));
	context.subscriptions.push(vscode.commands.registerCommand('split-toolkit.split-down', SplitDOWN));
}

export function deactivate() {}
