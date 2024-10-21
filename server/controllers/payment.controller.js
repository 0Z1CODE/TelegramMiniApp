import Payment from "../../db/models/payment.model.js";

export const createPayment = async (req, res) => {
  const payment = req.body;
  const newPayment = new Payment(payment);
console.log(payment);

  
  try {
    await newPayment.save();
    res.status(201).json(newPayment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};