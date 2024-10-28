import { getReceiversSocketId, io} from './../soket.js'; // Adjust the import path as necessary
import Payment from './../../db/models/payment.model.js'; // Adjust the import path as necessary
import Order from './../../db/models/order.model.js'; // Adjust the import path as necessary

// export const createPayment = async (req, res) => {
//   const { monobank, data } = req.body;

//   const order = await Order.findOne({ order_id: monobank.order_id });

//   const payment = {
//     order_id: order?._id,
//     user_id: order?.user_id,
//     status: 'pending',
//     mono_link: data?.pageUrl,
//     invoiceId: data?.invoiceId,
//     total_price: monobank?.total_price
//   };
//   const newPayment = new Payment(payment);


//   try {
//     await newPayment.save();

//     // Emit socket event
//     const receiverSocketId = getReceiversSocketId(order?.user_id);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit('paymentCreated', newPayment);
//     }

//     res.status(201).json(newPayment);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };


export const paymentHook = async (req, res) => {
  try {
  console.log("_______________________");
  console.log('data', req.body);
  console.log("_______________________");
  res.status(200).json({ message: 'Payment status updated' });
  
} catch (error) {
  res.status(409).json({ message: error.message });
}
};




