import { window } from 'vscode';
import { setupTerminal } from '.';

export default () => {
	const splitTerminal = setupTerminal();
	const commands = [
		'docker-compose stop mongo mongo2 redis',
		'colima stop',
		'exit',
	];

	// Check before things STOP to avoid Double Down
	splitTerminal.sendText(commands.join(' && '));

	const disposable = window.onDidCloseTerminal(t => {
		window.showInformationMessage('Split Down!');
		disposable.dispose();
	});
};
