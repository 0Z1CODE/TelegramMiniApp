
import {bot} from '../../bot/bot.js';
import { callbackQuery, message } from 'telegraf/filters';
import { getUserInfo } from './user.controller.js';
import { io } from '../soket.js';

const checkUserIs = () => {
  let a
  io.on('connection', (socket) => {
    a = socket.handshake.query.sysId;
    console.log('A user connected:', socket.handshake.query.sysId);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.handshake.query.sysId);
    });
  });
  return a;
}

export const telegrafHook = async (req, res) => {
  bot.handleUpdate(req.body, res);
//  const userId = req.body.message.from.id;

  
 
  console.log('Bot hook is used by:',checkUserIs());

  bot.on(callbackQuery, (ctx) => {
    console.log(ctx.update.callback_query.data);
  
    
  });


	res.status(200).json({ status: 'ok' });


};