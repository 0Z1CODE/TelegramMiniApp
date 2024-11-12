/** @format */

import { Markup } from 'telegraf';
import { bot } from '../../bot/bot.js';
import { callbackQuery, message } from 'telegraf/filters';
import Order from '../../db/models/order.model.js';
import dotenv from 'dotenv';
import axios from 'axios';
import { io } from './../soket.js'; // Adjust the import path as necessary


dotenv.config();

export const telegrafHook = async (req, res) => {
  bot.handleUpdate(req.body, res);
  const { message } = req.body;

  if (message && message.location) {
    console.log('User sent a location:', message.location);
    const { latitude, longitude } = message.location;
    await axios
      .post(
        `${process.env.GEOCODE_API_URL}?key=${process.env.GEOCODE_API_KEY}&lat=${latitude}&lon=${longitude}&format=json&accept-language=uk`,
      )
      .then((response) => {
        console.log(response.data);
        bot.telegram.sendMessage(
          message.chat.id,
          `Ваша локація: ${response.data.display_name}`,
          {
            reply_markup: {remove_keyboard: true},
          },
        );
        io.emit('location', response.data);
      })
      .catch((error) => console.log(error));
  }
  console.log('Bot hook is used111');
};
