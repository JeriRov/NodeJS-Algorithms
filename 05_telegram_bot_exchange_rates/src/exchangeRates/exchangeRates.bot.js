import {exchangeRateUSDtoEUR, start} from "./exchangeRates.handlers.js";
import bot from "../bot.js";

export const exchangeRatesBot = () => {
    bot.onText(/\/exchange_rates/, start);
    bot.onText(/(USD|EUR)/, exchangeRateUSDtoEUR);
}
