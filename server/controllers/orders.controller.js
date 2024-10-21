import Order from '../../db/models/order.model.js';
import Product from '../../db/models/product.model.js';
import uniqid from 'uniqid';
import User from '../../db/models/user.model.js';

export const createOrder = async (req, res) => {
	const order = req.body;
	const user = await User.findOne({ telegram_id: order.telegram_id });
	// const newOrder = new Order(order);

	const products = await Promise.all(
		order.products.map(async (product) => {
			const foundProduct = await Product.findOne({ product_code: product.product_code });
			return {
				...product,
				product: foundProduct._id,
				price: foundProduct.price,
				product_name: foundProduct.title,
				total: foundProduct.price * product.quantity
			};
		})
	);

	const newOrder = new Order({
		order_id: uniqid(),
		user_id: user._id,
		...order,
		products: products,
		total_price: products.reduce((acc, product) => acc + product.total, 0)
	});

	// newOrder.products[0].product = product._id;
	// newOrder.products[0].price = product.price;
	// newOrder.products[0].product_name = product.title;
	// newOrder.products[0].total = product.price * order.products[0].quantity;
	// newOrder.total_price = newOrder.products[0].total;

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
};

export const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
