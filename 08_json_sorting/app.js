import axios from 'axios';

const endpoints = [
    'https://jsonbase.com/sls-team/json-793',
    'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231',
    'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-93',
    'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770',
    'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281',
    'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310',
    'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469',
    'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516',
    'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706',
    'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350',
    'https://jsonbase.com/sls-team/json-64'
];

const getRequestWithRetry = async (url, maxRetries = 3) => {
    for (let retry = 0; retry <= maxRetries; retry++) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (retry === maxRetries) {
                console.log(`[Fail] ${url}: The endpoint is unavailable`);
                return null;
            }
        }
    }
}

const findIsDone = (data) => {
    if (typeof data === 'object') {
        if ('isDone' in data) {
            return data.isDone;
        } else {
            for (const key in data) {
                const result = findIsDone(data[key]);
                if (result !== null) {
                    return result;
                }
            }
        }
    }
    return null;
}

const processEndpoint = async (url) => {
    const data = await getRequestWithRetry(url);

    if (data) {
        const isDone = findIsDone(data);
        console.log(`[Success] ${url}: isDone - ${isDone}`);
        return isDone;
    }
    return null;
}

const main = async () => {
    let trueCount = 0;
    let falseCount = 0;

    for (const endpoint of endpoints) {
        const isDone = await processEndpoint(endpoint);

        if (isDone === true) {
            trueCount++;
        } else if (isDone === false) {
            falseCount++;
        }
    }

    console.log(`Found True values: ${trueCount}`);
    console.log(`Found False values: ${falseCount}`);
}

main();
