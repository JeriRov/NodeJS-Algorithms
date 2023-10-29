const fs = require('fs');

const filePath = (i) => `files/out${i}.txt`;

const uniqueValues = () => {
    const uniqueUsernames = new Set();

    console.time('uniqueValues');

    for (let i = 0; i <= 19; i++) {
        const fileContents = fs.readFileSync(filePath(i), {encoding: 'utf-8'});
        const usernames = fileContents.split('\n');

        for (const username of usernames) {
            uniqueUsernames.add(username);
        }
    }
    console.timeEnd('uniqueValues');
    return uniqueUsernames.size;
}

const existInAllFiles = () => {
    const usernamesInFiles = new Map();

    console.time('existInAllFiles');

    for (let i = 0; i <= 19; i++) {
        const fileContents = fs.readFileSync(filePath(i), {encoding: 'utf-8'});
        const usernames = fileContents.split('\n');
        const setOfUsernames = new Set(usernames);

        for (const username of setOfUsernames) {
            if (!usernamesInFiles.has(username)) {
                usernamesInFiles.set(username, 1);
            } else {
                usernamesInFiles.set(username, usernamesInFiles.get(username) + 1);
            }
        }
    }
    const usernamesInAllFiles = [...usernamesInFiles.values()].filter((count) => count === 20);

    console.timeEnd('existInAllFiles');

    return usernamesInAllFiles.length;
}

const existInAtLeastTen = () => {
    const usernamesInFiles = new Map();

    console.time('existInAtLeastTen');

    for (let i = 0; i <= 19; i++) {
        const fileContents = fs.readFileSync(filePath(i), {encoding: 'utf-8'});
        const usernames = fileContents.split('\n');
        const setOfUsernames = new Set(usernames);

        for (const username of setOfUsernames) {
            if (!usernamesInFiles.has(username)) {
                usernamesInFiles.set(username, 1);
            } else {
                usernamesInFiles.set(username, usernamesInFiles.get(username) + 1);
            }
        }
    }

    const usernamesInAtLeastTenFiles = [...usernamesInFiles.values()].filter((count) => count >= 10);

    console.timeEnd('existInAtLeastTen');
    return usernamesInAtLeastTenFiles.length;
}
console.time('Total');

console.log('Unique values: ', uniqueValues());
console.log('Exist in all files: ', existInAllFiles());
console.log('Exist in at least ten files: ', existInAtLeastTen());

console.timeEnd('Total');
