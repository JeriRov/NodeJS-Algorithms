import axios from 'axios';
import bot from "../bot.js";
import {CITY, OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_URL} from "./weather.config.js";

export const start = async (msg) => {
    const chatId = msg.chat.id;

    const intervalKeyboard = {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                ['at intervals of 3 hours', 'at intervals of 6 hours'], ['Back']
            ],
        },
    };

    bot.sendMessage(chatId, 'This is the weather forecast in Lviv. Select the update interval:', intervalKeyboard);
};

export const intervals = async (msg, match) => {
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

        bot.sendMessage(chatId, messages.join('\n'));
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'An error occurred while fetching the weather forecast.');
    }
};

