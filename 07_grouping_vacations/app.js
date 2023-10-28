const fs = require('fs');
const transformVacationJSON = () => {
    const result = [];
    const userData = {};

    originalData.forEach((record) => {
        const userId = record.user._id;
        const userName = record.user.name;
        const vacationInfo = {
            startDate: record.startDate,
            endDate: record.endDate,
        };

        if (!userData[userId]) {
            userData[userId] = {
                userId,
                userName,
                vacations: [],
            };
        }
        userData[userId].vacations.push(vacationInfo);
    });

    for (const userId in userData) {
        result.push(userData[userId]);
    }

    const resultJSON = JSON.stringify(result, null, 2);

    fs.writeFileSync('./result.json', resultJSON);
}

const originalData = JSON.parse(fs.readFileSync('./data.json', {encoding: 'utf-8'}));
transformVacationJSON(originalData)
