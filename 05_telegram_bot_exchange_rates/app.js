import {startBot} from "./src/bot.js";
import {exchangeRatesBot} from "./src/exchangeRates/exchangeRates.bot.js";
import {weatherBot} from "./src/weather/weather.bot.js";

startBot();
exchangeRatesBot();
weatherBot();
