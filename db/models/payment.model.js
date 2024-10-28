/** @format */

import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  status: {
    type: String,
  },
  invoiceId: {
    type: String,
  },
  payMethod: {
    type: String,
  },
  amount: {
    type: Number,
  },
  ccy: {
    type: Number,
  },
  finalAmount: {
    type: Number,
  },
  createdDate: {
    type: Date,
  },
  modifiedDate: {
    type: Date,
  },
  paymentInfo: {
    rrn: {
      type: String,
    },
    approvalCode: {
      type: String,
    },
    tranId: {
      type: String,
    },
    terminal: {
      type: String,
    },
    bank: {
      type: String,
    },
    paymentSystem: {
      type: String,
    },
    country: {
      type: String,
    },
    fee: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    maskedPan: {
      type: String,
    },
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
