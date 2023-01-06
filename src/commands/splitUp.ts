import * as vscode from 'vscode';
import { setupTerminal } from '.';

export default () => {
	const splitTerminal = setupTerminal();
	const commands = [
		'colima start',
		'docker-compose up -d mongo mongo2 redis',
		'exit',
	];

	// Check before things START to avoid Double Up
	splitTerminal.sendText(commands.join(' && '));

	const disposable = vscode.window.onDidCloseTerminal(t => {
		vscode.window.showInformationMessage('Split Up!');
		disposable.dispose();
	});
};
