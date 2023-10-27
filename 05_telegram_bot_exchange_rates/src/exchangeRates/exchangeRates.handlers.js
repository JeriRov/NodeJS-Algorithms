import axios from 'axios';
import NodeCache from 'node-cache';
import {API_URLS, ISO_CODES, MONOBANK_RATE_LIMIT} from "./exchangeRates.config.js";
import bot from "../bot.js";

const cache = new NodeCache({stdTTL: MONOBANK_RATE_LIMIT});

export const start = (msg) => {
    const chatId = msg.chat.id;

    const keyboard = {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                ['USD', 'EUR'], ['Back']
            ],
        },
    };

    bot.sendMessage(chatId, 'Choose a currency:', keyboard);
};

export const exchangeRateUSDtoEUR = async (msg, match) => {
    const chatId = msg.chat.id;
    const currency = match[1];

    try {
        let message = '';

        switch (currency) {
            case 'USD':
                const {privatbankUSD} = await getPrivatBankRates();
                const {monobankUSD} = await getMonoBankRates();

                message = `PrivatBank USD rate: ${privatbankUSD.buy} UAH (buy), ${privatbankUSD.sale} UAH (sale)\n\n`;
                message += `Monobank USD rate: ${monobankUSD.rateBuy} UAH (buy), ${monobankUSD.rateSell} UAH (sale)`;
                break;

            case 'EUR':
                const {privatbankEUR} = await getPrivatBankRates();
                const {monobankEUR} = await getMonoBankRates();

                message = `PrivatBank EUR rate: ${privatbankEUR.buy} UAH (buy), ${privatbankEUR.sale} UAH (sale)\n\n`;
                message += `Monobank EUR rate: ${monobankEUR.rateBuy} UAH (buy), ${monobankEUR.rateSell} UAH (sale)`;
                break;
        }


        bot.sendMessage(chatId, message);
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'An error occurred while fetching the exchange rate.');
    }
};


const getMonoBankRates = async () => {

    let {monobankUSD, monobankEUR} = {};
    const monobankRates = cache.get('monobank');

    if (monobankRates) {
        monobankEUR = monobankRates.monobankEUR;
        monobankUSD = monobankRates.monobankUSD;
    } else {
        const {data} = await axios.get(API_URLS.MONOBANK_API_URL);
        monobankUSD = data.find(rate => rate.currencyCodeA === ISO_CODES.USD_ISO && rate.currencyCodeB === ISO_CODES.UAH_ISO);
        monobankEUR = data.find(rate => rate.currencyCodeA === ISO_CODES.EUR_ISO && rate.currencyCodeB === ISO_CODES.UAH_ISO);
        cache.set('monobank', {
            monobankEUR: {
                rateBuy: monobankEUR.rateBuy,
                rateSell: monobankEUR.rateSell
            },
            monobankUSD: {
                rateBuy: monobankUSD.rateBuy,
                rateSell: monobankUSD.rateSell
            },
        });
    }

    return {monobankEUR, monobankUSD};
}

const getPrivatBankRates = async () => {
    const privatbankResponse = await axios.get(API_URLS.PRIVATBANK_API_URL);
    let [privatbankEUR, privatbankUSD] = privatbankResponse.data;

    return {privatbankEUR, privatbankUSD};
}

