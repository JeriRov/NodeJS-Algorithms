const fs = require('fs');

const filePath = (i) => `files/out${i}.txt`;

const uniqueValues = () => {
    const uniqueUsernames = new Set();

    console.time('uniqueValues');

    for (let i = 0; i <= 19; i++) {
        const fileContents = fs.readFileSync(filePath(i), 'utf-8');
        const usernames = fileContents.split('\n');

        for (const username of usernames) {
            uniqueUsernames.add(username);
        }
    }
    console.timeEnd('uniqueValues');
    return uniqueUsernames.size;
}

const existInAllFiles = () => {
    const usernamesInFiles = {};

    console.time('existInAllFiles');

    for (let i = 0; i <= 19; i++) {
        const fileContents = fs.readFileSync(filePath(i), 'utf-8');
        const usernames = fileContents.split('\n');
        const setOfUsernames = new Set(usernames);

        for (const username of setOfUsernames) {
            if (!usernamesInFiles[username]) {
                usernamesInFiles[username] = 1;
            } else {
                usernamesInFiles[username]++;
            }
        }
    }
    const usernamesInAllFiles = Object.keys(usernamesInFiles).filter(username => usernamesInFiles[username] === 20);


    console.timeEnd('existInAllFiles');

    return usernamesInAllFiles.length;
}

const existInAtLeastTen = () => {
    const usernamesInFiles = {};

    console.time('existInAtLeastTen');

    for (let i = 0; i <= 19; i++) {
        const fileContents = fs.readFileSync(filePath(i), 'utf-8');
        const usernames = fileContents.split('\n');
        const setOfUsernames = new Set(usernames);

        for (const username of setOfUsernames) {
            if (!usernamesInFiles[username]) {
                usernamesInFiles[username] = 1;
            } else {
                usernamesInFiles[username]++;
            }
        }
    }

    const usernamesInAtLeastTenFiles = Object.keys(usernamesInFiles).filter(username => usernamesInFiles[username] >= 10);

    console.timeEnd('existInAtLeastTen');
    return usernamesInAtLeastTenFiles.length;
}

console.log('Unique values: ', uniqueValues());
console.log('Exist in all files: ', existInAllFiles());
console.log('Exist in at least ten files: ', existInAtLeastTen());
