/** @format */

import Order from '../../db/models/order.model.js';
import Product from '../../db/models/product.model.js';
import uniqid from 'uniqid';
import User from '../../db/models/user.model.js';
import { bot } from '../../bot/bot.js';
import { Markup } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();

export const createOrder = async (req, res) => {
  const order = req.body;
  const user = await User.findOne({ telegram_id: order.telegram_id });
  // const newOrder = new Order(order);

  const products = await Promise.all(
    order.products.map(async (product) => {
      const foundProduct = await Product.findOne({
        product_code: product.product_code,
      });
      return {
        ...product,
        product: foundProduct._id,
        price: foundProduct.price,
        product_name: foundProduct.title,
        total: foundProduct.price * product.quantity,
      };
    }),
  );

  const newOrder = new Order({
    order_id: uniqid(),
    user_id: user._id,
    ...order,
    products: products,
    total_price: products.reduce((acc, product) => acc + product.total, 0),
  });

  try {
    await newOrder.save();
    bot.telegram.sendMessage(
      order.telegram_id,
      `Ваше замовлення №${newOrder.order_id} прийнято!\n${
        order.payment === 'cash'
          ? 'Очікуйте на дзвінок чи повідомлення від оператора'
          : 'Очікуйте на посилання для оплати'
      }`,
    );
    bot.telegram.sendMessage(
      process.env.ADMIN_CHAT_ID,
      `Нове замовлення від користувача ${
        user.username || user.first_name + ' ' + user.last_name
      } на суму ${newOrder.total_price} грн.`,
      Markup.inlineKeyboard([
        Markup.button.callback(
          'Переглянути',
          `order_info_${newOrder.order_id}`,
        ),
        Markup.button.callback('В роботу', `send_message_${user.telegram_id}`),
      ]),
    );
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOrderInfo = async (req, res) => {
  const { order_id } = req.params;
  try {
    const order = await Order.findOne({ order_id: order_id });
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
