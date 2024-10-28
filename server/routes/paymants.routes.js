import express from "express";
import {paymentHook} from "../controllers/payment.controller.js";
const router = express.Router();

router.post('/', paymentHook);
// router.post('/monobank', monoCb);



export default router;