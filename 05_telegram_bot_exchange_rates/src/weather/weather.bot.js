import bot from "../bot.js";
import {intervals, start} from "./weather.handlers.js";

export const weatherBot = () => {
    bot.onText(/\/weather/, start);
    bot.onText(/at intervals of ([36]) hours/, intervals);
}
