import TelegramBot from "node-telegram-bot-api";
import {ABLE_BOTS, BOT_TOKEN} from "./config.js";

const bot = new TelegramBot(BOT_TOKEN, {polling: true});

export const startBot = () => {
    bot.onText(/\/start|Back/, async (msg) => {
        const chatId = msg.chat.id;

        const keyboard = {
            reply_markup: {
                resize_keyboard: true,
                keyboard: ABLE_BOTS,
            },
        };

        bot.sendMessage(chatId, 'Choose an option:', keyboard);
    });
}

export default bot;
