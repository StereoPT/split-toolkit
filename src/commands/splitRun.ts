import { window, env, Uri } from 'vscode';
import { setupTerminal } from '.';

export default () => {
	const splitTerminal = setupTerminal();
	const commands = ['npm run dev'];

	// Check before things RUN to avoid Double Run
	splitTerminal.sendText(commands.join(' && '));
	window.showInformationMessage('Split Running!');
	env.openExternal(Uri.parse('http://localhost:3000'));
};
