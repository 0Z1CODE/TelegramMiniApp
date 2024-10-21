import Payment from "../../db/models/payment.model.js";
import Order from "../../db/models/order.model.js";


export const createPayment = async (req, res) => {
  const {data, monobank} = req.body;
  const order = await Order.findOne({order_id: monobank.order_id});
  const payment = {
  order_id: order._id,
  user_id: order.user_id,
  status: 'pending',
  mono_link: data.pageUrl,
  invoiceId: data.invoiceId,
  total_price: monobank.total_price
  };

  

  try {
    const newPayment = new Payment(payment);
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
  
};