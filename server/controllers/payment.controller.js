/** @format */

import { io } from './../soket.js'; // Adjust the import path as necessary
import Payment from './../../db/models/payment.model.js'; // Adjust the import path as necessary
import Order from './../../db/models/order.model.js'; // Adjust the import path as necessary
import User from './../../db/models/user.model.js'; // Adjust the import path as necessary
import { setPaymantCall } from '../templates/SuccsesPayment.js';

export const createPayment = async (req, res) => {
  const data = req.body;

  const order = await Order.findOne({ order_id: data.order_id });

  const payment = {
    order_id: order?._id,
    user_id: order?.user_id,
    pageUrl: data?.pageUrl,
    invoiceId: data?.invoiceId,
  };
  const newPayment = new Payment(payment);

  try {
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const paymentHook = async (req, res) => {
  const data = req.body;
  try {
    const payment = await Payment.findOneAndUpdate(
      { invoiceId: data.invoiceId },
      { $set: data },
      { new: true },
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Emit socket event

    if (payment) {
      io.emit('paymentUpdated', payment);
      const user = await User.findOne({ _id: payment.user_id });
      if (user && payment.status === 'success') {
        io.to(user._id).emit('paymentUpdated', payment);
        setPaymantCall({ params: payment, telegram_id: user.telegram_id });
      }
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
