import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const BOT_TOKEN = process.env.BOT_TOKEN;
const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY;
const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const CITY = 'Lviv';

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    const keyboard = {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                ['Forecast in Lviv'],
            ],
        },
    };

    await bot.sendMessage(chatId, 'Choose an option:', keyboard);
});

bot.onText(/Forecast in Lviv/, async (msg) => {
    const chatId = msg.chat.id;

    const intervalKeyboard = {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                ['at intervals of 3 hours', 'at intervals of 6 hours'],
            ],
        },
    };

    await bot.sendMessage(chatId, 'Select the update interval:', intervalKeyboard);
});

bot.onText(/at intervals of ([36]) hours/, async (msg, match) => {
    const chatId = msg.chat.id;
    const interval = match[1];
    try {
        const response = await axios.get(`${OPEN_WEATHER_API_URL}?q=${CITY}&appid=${OPEN_WEATHER_API_KEY}`)

        const forecastData = response.data.list;
        const messages = [];

        let prevTimestamp = 0;

        forecastData.forEach((forecast) => {
            const currentTimestamp = forecast.dt;
            if (currentTimestamp - prevTimestamp >= interval * 3600) {
                messages.push(`${new Date(forecast.dt * 1000).toLocaleString()}: ${forecast.weather[0].description}`);
                prevTimestamp = currentTimestamp;
            }
        });

        await bot.sendMessage(chatId, messages.join('\n'));
    } catch (error) {
        console.error(error);
        await bot.sendMessage(chatId, 'An error occurred while fetching the weather forecast.');
    }
});
