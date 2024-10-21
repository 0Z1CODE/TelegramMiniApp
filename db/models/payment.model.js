import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
	{
		order_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Order'
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		status: {
			type: String,
			required: true
		},
		mono_link: {
			type: String,
			required: true
		},
		invoiceId: {
			type: String,
			required: true
		},
		total_price: {
			type: Number,
			required: true
		}
	},
	{ timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
