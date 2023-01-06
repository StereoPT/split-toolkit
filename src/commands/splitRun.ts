import * as vscode from 'vscode';
import { setupTerminal } from '.';

export default () => {
	const splitTerminal = setupTerminal();
	const commands = ['npm run dev'];

	// Check before things RUN to avoid Double Run
	splitTerminal.sendText(commands.join(' && '));
	vscode.window.showInformationMessage('Split Running!');
	vscode.env.openExternal(vscode.Uri.parse('http://localhost:3000'));
};
