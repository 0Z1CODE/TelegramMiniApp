import express from "express";
import { getProducts, createProduct, editProduct,getProductsByCategory, getProductById} from "../controllers/products.controller.js";


const router = express.Router();

router.get('/', getProducts);
router.put('/:product_code', editProduct);
router.get('/:product_code', getProductById);
router.post('/', createProduct);
router.get('/category/:category', getProductsByCategory);

export default router;