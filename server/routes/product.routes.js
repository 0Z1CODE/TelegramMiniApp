import express from "express";
import { getProducts, createProduct, editProduct } from "../controllers/products.controller.js";


const router = express.Router();

router.get('/', getProducts);
router.put('/:product_code', editProduct);
router.post('/', createProduct);

export default router;