import inquirer from 'inquirer';
import fs from 'fs';

const DATABASE_FILE_NAME = 'database.txt';
let users = [];

const loadDatabase = () => {
    try {
        const data = fs.readFileSync(DATABASE_FILE_NAME, 'utf8');
        users = JSON.parse(data);
    } catch (error) {
        users = [];
    }
}

const saveDatabase = () => {
    fs.writeFileSync(DATABASE_FILE_NAME, JSON.stringify(users), 'utf8');
}

const addUser = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the user's name. To cancel press ENTER:",
        },
    ]);
    if (answers.name) {
        await promptForUserInfo(answers.name);
    } else {
        saveDatabase();
        await searchOrExit();
    }
}

const promptForUserInfo = async (name) => {
    const userInfo = await inquirer.prompt([
        {
            type: 'list',
            name: 'gender',
            message: 'Choose your Gender:',
            choices: ['Male', 'Female'],
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age:',
        },
    ]);

    users.push({name, ...userInfo});
    await addUser();
}

const searchOrExit = async () => {
    const answer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'search',
            message: 'Would you search values in DB?',
        },
    ]);
    if (answer.search) {
        await searchUser();
    } else {
        console.log('Exiting the application.');
    }
}

const searchUser = async () => {
    console.log(users);
    const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'searchName',
            message: "Enter user's name you wanna find in DB:",
        },
    ]);

    const searchName = answer.searchName.toLowerCase();
    const foundUser = users.find((user) => user.name.toLowerCase() === searchName);

    if (foundUser) {
        console.log(`User ${foundUser.name} was found:`);
        console.log(foundUser);
    } else {
        console.log('User not found in the database.');
    }
}

const main = async () => {
    loadDatabase();
    await addUser();
}

main();
