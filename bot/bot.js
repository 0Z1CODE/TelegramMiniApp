import {Markup, Telegraf} from 'telegraf';

import {message} from 'telegraf/filters';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import path from 'path';
import { voiceMsgHendler } from './utils/voiceHendler.js';
import connectToMongoDb from '../db/mongoConnect.js';
import User from "./../db/models/user.model.js";
import { notDeepEqual } from 'assert';


dotenv.config();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
export const  __dirname = path.dirname(__filename); // get the name of the directory


const token = process.env.BOT_TOKEN;
const App_URL = process.env.WEB_APP_URL;

const bot = new Telegraf(token);
await connectToMongoDb();

bot.telegram.setMyCommands([
  { command: "/start", description: "Start" },
  { command: "/store", description: "Store" },
  // { command: "/oldschool", description: "oldschool" },
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
    `Hello ${tgUser.first_name}!`, Markup.inlineKeyboard([Markup.button.webApp("App", App_URL)]).resize(),
  );
});

bot.command("store", ctx =>
	ctx.reply(
		"Launch mini app from keyboard!",
		Markup.keyboard([Markup.button.webApp("Launch", App_URL)]).resize(),
	),
);

// bot.on(message("text"), async (ctx) => {
//   const userMessage = await ctx.message.text;
//   const message = await ctx.message;
//   await ctx.reply("Trururururur")
//   // if(userMessage === "Lol") await ctx.reply("Trururururur")

// });

bot.on(message('web_app_data'), async (ctx) => {
  console.log(ctx.update.message.web_app_data);
  ctx.reply("Надати своє місцезнаходження", Markup.keyboard([
    Markup.button.locationRequest("Надати місцезнаходження")
  ]));
  // ctx.reply("Дякужмо", Markup.removeKeyboard());
});

bot.on(message('voice'), async (ctx) => {
  voiceMsgHendler(__dirname, bot, ctx)
});



bot.catch(error => {
  console.log('telegraf error', error);
  });

bot.launch();



