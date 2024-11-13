import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		order_id: {
			type: String,
			unique: true,
			required: true,
	
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		telegram_id: {
			type: Number,
			required: true
		},
		
		products: [
			{
				product:{
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product',
					required: true
				},

				product_code: {
					type: String,
					required: true
				},

				quantity: {
					type: Number,
					required: true
				},
				price: {
					type: Number,
					required: true
				},
				product_name: {
					type: String,
					required: true
				},
				total: {
					type: Number,
					required: true
				}
			}
		],
		total_price: {
			type: Number,
			required: true,
			
		},
		oreder_owner: {
			first_name: {
				type: String,
				required: true
			},
			last_name: {
				type: String,
				required: true
			},
			phone: {
				type: String,
				required: true
			},
			email: {
				type: String
			}
		},
		delivery: {
			type: String,
			required: true
		},
		delivery_info: {
			type: Object
		},

		payment: {
			type: String, // card, cash, online
			required: true
		},

		status: {
			type: String,
			required: true,
			default: 'new'
		},
		admin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
