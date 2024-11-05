

import { Markup, Telegraf } from 'telegraf';

import { message , callbackQuery} from 'telegraf/filters';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
import path from 'path';
import { voiceMsgHendler } from './utils/voiceHendler.js';
import connectToMongoDb from '../db/mongoConnect.js';
import { getUser } from './utils/db.actions.js';
// import { Server } from 'socket.io';
// import { io } from 'socket.io-client';

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
export const __dirname = path.dirname(__filename); // get the name of the directory

const token = process.env.BOT_TOKEN;
const App_URL = process.env.WEB_APP_URL;
const SERVER_URL = process.env.SERVER_URL;

export const bot = new Telegraf(token);
await connectToMongoDb();

bot.telegram.setMyCommands([
  { command: '/start', description: 'Start' },
  { command: '/store', description: 'Store' },
  { command: "/oldschool", description: "oldschool" },
]);

bot.start(async (ctx) => {
  const user = await getUser(ctx);
  ctx.reply(
    `Привіт. Раді вітати Вас ${user?.first_name}!`,
    Markup.inlineKeyboard([
      Markup.button.webApp('Магазин', `${App_URL}`),
    ]).resize(),
  );
});

bot.command('store', (ctx) =>
  ctx.reply(
    'Відвідайте наш магазин',
    Markup.inlineKeyboard([
      Markup.button.webApp('Магазин', App_URL)
    ]).resize(),
  ),
);

bot.on(callbackQuery('web_app_data'), (ctx) => {
  ctx.answerCbQuery('Ви відкрили веб-додаток!');
});


bot.on(message('voice'), async (ctx) => {
  voiceMsgHendler(__dirname, bot, ctx);
});

bot.on(message('contact'), async (ctx) => {
  const contact = ctx.message.contact;
  if (contact) {
    ctx.reply(`Дякуємо за наданий контакт: ${contact.phone_number}`);
  } else {
    ctx.reply('Будь ласка, надішліть контакт.');
  }
});

bot.launch({
  webhook: {
    domain: `${SERVER_URL}/telegraf/:token`,
    // secretToken: process.env.BOT_TOKEN,
    maxConnections: 100,
    allowedUpdates: ['message', 'callback_query'],
    pendingUpdateLimit: 3,
  },
});


