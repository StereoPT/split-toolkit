import{ window } from 'vscode';
import axios from 'axios';
import { faker } from '@faker-js/faker';

const numberOfAccounts = 5;

type User = {
  email: string
  firstName: string
  lastName: string
  password: string
}

export default async () => {
  const users: User[] = [];

  Array.from({ length: numberOfAccounts }).forEach(() => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const password = "1Potato!"

    users.push({
      email, firstName, lastName, password
    });
  });

  // Seed Database Here
  for(const user of users) {
    await axios.post('http://localhost:3200/auth/register', user);
    window.showInformationMessage(`Created: ${user.email}`);
  }

  window.showInformationMessage("Database Seeded!");
};
