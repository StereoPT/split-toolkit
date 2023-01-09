import { window } from 'vscode';
import axios from 'axios';
import { faker } from '@faker-js/faker';

type User = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
};

export default async () => {
	const users: User[] = [];

	const userInput = await window.showInputBox({
		title: 'How many users to add?',
		placeHolder: 'Number of users',
	});

	if (!userInput) return;
	if (+userInput <= 0) {
		window.showErrorMessage('User amount must be greater than 0!');
		return;
	}

	Array.from({ length: +userInput }).forEach(() => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const email = faker.internet.email(firstName, lastName);
		const password = '1Potato!';

		users.push({
			email,
			firstName,
			lastName,
			password,
		});
	});

	// Seed Database Here
	for (const user of users) {
		await axios.post('http://localhost:3200/auth/register', user);
		window.showInformationMessage(`Created: ${user.email}`);
	}

	window.showInformationMessage('Database Seeded!');
};
