import { window, QuickPickItem } from 'vscode';

import splitUp from './splitUp';
import splitDown from './splitDown';
import splitRun from './splitRun';
import seed from './seed';

export const setupTerminal = () => {
	let splitTerminal = window.activeTerminal;

	if (!splitTerminal) {
		splitTerminal = window.createTerminal('Split');
		splitTerminal.show();
	}

	return splitTerminal;
};

type commandType = {
	[key: string]: () => void;
};

const commands: commandType = {
	up: splitUp,
	down: splitDown,
	run: splitRun,
	seed: seed,
};

type CustomQuickPickItem = QuickPickItem & {
	key: string;
};

const SplitQuickPick = async () => {
	const pickOptions: CustomQuickPickItem[] = [
		{
			key: 'up',
			label: '$(fold-up) Up',
			detail: 'Starts Colima and Docker Containers',
			picked: false,
		},
		{
			key: 'down',
			label: '$(fold-down) Down',
			detail: 'Stops Colima and Docker Containers',
			picked: false,
		},
		{
			key: 'run',
			label: '$(run) Run',
			detail: 'Starts Frontend and Backend',
			picked: false,
		},
		{
			key: 'seed',
			label: '$(organization) Seed',
			detail: 'Seeds the Database with Users',
			picked: false,
		},
	];

	window
		.showQuickPick(pickOptions, {
			canPickMany: false,
			title: 'Split-Toolkit',
		})
		.then(selected => {
			if (!selected) return;

			if (!commands[selected.key]) return;

			return commands[selected.key]();
		});
};

export default {
	name: 'split-toolkit.split',
	fn: SplitQuickPick,
};
