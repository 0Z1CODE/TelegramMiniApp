/** @format */

import { Markup, Telegraf } from 'telegraf';
import { message, callbackQuery } from 'telegraf/filters';
import { fileURLToPath } from 'url';
import Order from '../db/models/order.model.js';
import { ApexImageAnalyzer } from 'apexify.js'; 

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
  // { command: '/oldschool', description: 'oldschool' },
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
    Markup.inlineKeyboard([Markup.button.webApp('Магазин', App_URL)]).resize(),
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

bot.on(callbackQuery('data'), async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (data.includes('order_info')) {
    const order_id = data.split('_')[2];
    const order = await Order.findOne({ order_id }).populate(
      'products.product',
    );
    bot.telegram.sendMessage(
      process.env.ADMIN_CHAT_ID,
      `Інформація про замовлення:\nНомер замовлення: ${
        order.order_id
      } \n Товар: ${order.products[0].product.title} \n Загальна сума: ${
        order.total_price
      } \n Отримувач: ${order.oreder_owner.first_name} ${
        order.oreder_owner.last_name
      } \n Телефон: ${order.oreder_owner.phone} \n Доставка: ${
        order.delivery === 'delivery' ? 'Доставка' : 'Самовивіз'
      } \n Оплата: ${
        order.payment === 'cash' ? 'Оплата при отриманні' : 'Онлайн'
      }`
    );
  }
});
bot.on(message('photo'), async (ctx) => {
  const photo = ctx.message.photo;
  if (photo && photo.length > 0) {
    const fileId = photo[photo.length - 1].file_id; // Get the highest resolution photo
    const fileUrl = await bot.telegram.getFileLink(fileId);

    const prompt = 'What can you tell me about this image?';
    // const prompt = 'Tell me about this product';
    // const prompt = 'I need to know brand from image';

    const analysisResult = await ApexImageAnalyzer({ imgURL: fileUrl, prompt });

    ctx.reply(`Дякуємо за надане фото! Ось посилання на нього: ${fileUrl}`);
    ctx.reply(`Результат аналізу: ${analysisResult}`);
  } else {
    ctx.reply('Будь ласка, надішліть фото.');
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
