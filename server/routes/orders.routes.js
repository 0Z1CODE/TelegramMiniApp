import express from "express";
import { createOrder, getAllOrders, getOrderInfo } from "../controllers/orders.controller.js";

const router = express.Router();

router.post('/', createOrder);
router.get('/:order_id', getOrderInfo);
router.get('/', getAllOrders);


export default router;