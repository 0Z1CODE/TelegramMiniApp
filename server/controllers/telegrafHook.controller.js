
import { Markup } from 'telegraf';
import {bot} from '../../bot/bot.js';
import { callbackQuery, message } from 'telegraf/filters';



export const telegrafHook = async (req, res) => {
  bot.handleUpdate(req.body, res);
  const { message } = req.body;

  if (message && message.location) {
    console.log('User sent a location:', message.location);
    Markup.removeKeyboard(true);
  }

  console.log('Bot hook is used111');
	res.status(200).json({ status: 'ok' });


};