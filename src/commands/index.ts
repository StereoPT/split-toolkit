import * as vscode from 'vscode';
import splitUp from './splitUp';
import splitDown from './splitDown';
import splitRun from './splitRun';

export const setupTerminal = () => {
	let splitTerminal = vscode.window.activeTerminal;

	if (!splitTerminal) {
		splitTerminal = vscode.window.createTerminal('Split');
		splitTerminal.show();
	}

	return splitTerminal;
};

export default {
	'split-toolkit.split-up': splitUp,
	'split-toolkit.split-down': splitDown,
	'split-toolkit.split-run': splitRun,
};
