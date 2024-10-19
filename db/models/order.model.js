import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		order_id: {
			type: Number,
			unique: true,
			default: "11",
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		products: [
			{
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
					required: true,
					default: function() {
						return this.quantity * this.price;
					}
				}
			}
		],
		total_price: {
			type: Number,
			required: true,
			default: function() {
				return this.products.reduce((total, product) => total + product.quantity * product.total, 0);
			}
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
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
