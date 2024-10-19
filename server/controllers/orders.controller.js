import Order from '../../db/models/order.model.js';

export const createOrder = async (req, res) => {
	const order = req.body;
	const newOrder = new Order(order);

	try {
		await newOrder.save();
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
}

export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
