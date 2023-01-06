import * as vscode from 'vscode';

const setupTerminal = () => {
	let splitTerminal = vscode.window.activeTerminal;

	if (!splitTerminal) {
		splitTerminal = vscode.window.createTerminal('Split');
		splitTerminal.show();
	}

	return splitTerminal;
};

export function activate(context: vscode.ExtensionContext) {
	const SplitUP = () => {
		const splitTerminal = setupTerminal();
		const commands = [
			'colima start',
			//'docker-compose up -d mongo mongo2 redis',
			'exit',
		];

		// Check before things START to avoid Double Up
		splitTerminal.sendText(commands.join(' && '));
		const disposable = vscode.window.onDidCloseTerminal(t => {
			vscode.window.showInformationMessage('Split Up!');
			disposable.dispose();
		});
	};

	const SplitDOWN = () => {
		const splitTerminal = setupTerminal();
		const commands = [
			//'docker-compose stop mongo mongo2 redis',
			'colima stop',
			'exit',
		];

		// Check before things STOP to avoid Double Down
		splitTerminal.sendText(commands.join(' && '));

		const disposable = vscode.window.onDidCloseTerminal(t => {
			vscode.window.showInformationMessage('Split Down!');
			disposable.dispose();
		});
	};

	const SplitRUN = () => {
		const splitTerminal = setupTerminal();
		const commands = ['npm run dev'];

		// Check before things RUN to avoid Double Run
		splitTerminal.sendText(commands.join(' && '));
		vscode.window.showInformationMessage('Split Running!');
	};

	context.subscriptions.push(
		vscode.commands.registerCommand('split-toolkit.split-up', SplitUP)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('split-toolkit.split-down', SplitDOWN)
	);
	context.subscriptions.push(
		vscode.commands.registerCommand('split-toolkit.split-run', SplitRUN)
	);
}

export function deactivate() {}
