/** @format */

import Order from '../../db/models/order.model.js';
import { bot } from '../../bot/bot.js';
import dotenv from 'dotenv';
dotenv.config();

const WEB_APP_URL = process.env.WEB_APP_URL;

export const setPaymantCall = async ({ params, telegram_id }) => {
  console.log('call ');
  const order = await Order.findOne({ _id: params.order_id });
  try {
    const paymentStatus = params.status;
    console.log(paymentStatus, 'status');
    console.log(order, 'order');
    console.log(telegram_id, 'telegram_id');
    console.log('params', params);

    if (order) {
      order.status = 'paid';
      await order.save();

    }
    order && paymentStatus === 'success'
      ? bot.telegram.sendMessage(
          telegram_id,
          `Дякуємо!\nОплат замовлення <b>${order.order_id}</b> успішно проведено`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Переглянути замовлення',
                    web_app: { url: `${WEB_APP_URL}/order/${order._id}` },
                  },
                ],
              ],
            },
          },
        )
      : console.log('error');

    return order;
  } catch (error) {
    return error;
  }
};
