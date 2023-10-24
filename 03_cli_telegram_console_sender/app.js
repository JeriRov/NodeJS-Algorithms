process.env["NTBA_FIX_350"] = true;

import {program} from 'commander';
import TelegramBot from 'node-telegram-bot-api';

if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
    console.error('Please set BOT_TOKEN and CHAT_ID environment variables.');
    process.exit(1);
}

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const bot = new TelegramBot(BOT_TOKEN, {polling: true});

const sendToTelegram = async (action, messageOrPath, successMessage) => {
    try {
        await action(CHAT_ID, messageOrPath);
        console.log(successMessage);
        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

program.version('1.0.0').description('Telegram CLI Application');

program.command('message <message>')
    .alias('m')
    .description('Send a message to your Telegram bot')
    .action(async (message) => {
        await sendToTelegram(bot.sendMessage.bind(bot), message, 'Message sent successfully!');
    });

program.command('photo <path>')
    .alias('p')
    .description('Send a photo to your Telegram bot')
    .action(async (path) => {
        await sendToTelegram(bot.sendPhoto.bind(bot), path, 'Photo sent successfully!');
    });

program.allowUnknownOption();
program.parse(process.argv);
