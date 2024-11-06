
import {bot} from '../../bot/bot.js';
import { callbackQuery, message } from 'telegraf/filters';
import { getUserInfo } from './user.controller.js';
import { io } from '../soket.js';


export const telegrafHook = async (req, res) => {
  bot.handleUpdate(req.body, res);
  console.log('Bot hook is used');
	res.status(200).json({ status: 'ok' });


};