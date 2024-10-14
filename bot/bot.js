import {Telegraf} from 'telegraf';

import {message} from 'telegraf/filters';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import path from 'path';
import { voiceMsgHendler } from './utils/voiceHendler.js';
import connectToMongoDb from '../db/mongoConnect.js';
import User from "./../db/models/user.model.js";


dotenv.config();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
export const  __dirname = path.dirname(__filename); // get the name of the directory


const token = process.env.BOT_TOKEN;

const bot = new Telegraf(token);
await connectToMongoDb();

bot.telegram.setMyCommands([
  { command: "/start", description: "Start" },
  { command: "/store", description: "Store" },
  { command: "/help", description: "Halp" },
]);

bot.start( async (ctx) => {
  const tgUser = ctx.from;
  const user = await  User.findOne({telegram_id: tgUser.id});
  if (tgUser && !user ) {
    const newUser = new User({
      telegram_id: tgUser.id,
      ...tgUser,
    });
    await newUser.save();
    return user;
  }
  ctx.reply(
    "Привіт!"
  );
});



bot.on(message("text"), async (ctx) => {
  const userMessage = ctx.message.text;
  const message = ctx.message;
  if(userMessage === "Lol") await ctx.reply("Trururururur")
});

bot.catch(error => {
console.log('telegraf error', error);
});

bot.on(message('voice'), async (ctx) => {
  voiceMsgHendler(__dirname, bot, ctx)
});


bot.launch();



