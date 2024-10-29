/** @format */

import express from 'express';
import {
  paymentHook,
  createPayment,
} from '../controllers/payment.controller.js';
const router = express.Router();

router.post('/', createPayment);
router.post('/hook', paymentHook);

export default router;
