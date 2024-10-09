import {Telegraf} from 'telegraf';

import {message} from 'telegraf/filters';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import path from 'path';
import { voiceMsgHendler } from './utils/voiceHendler.js';



dotenv.config();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
export const  __dirname = path.dirname(__filename); // get the name of the directory


const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);

bot.telegram.setMyCommands([
  { command: "/start", description: "Start" },
]);

bot.start((ctx) => {
  ctx.reply(
    "Привіт!"
  );
});


bot.on(message("text"), async (ctx) => {
  const userMessage = ctx.message.text;
  const message = ctx.message;
});


bot.on(message('voice'), async (ctx) => {
  voiceMsgHendler(__dirname, bot, ctx)
});


bot.launch();



