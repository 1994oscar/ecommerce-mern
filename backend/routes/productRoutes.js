import express from 'express'
import {getProducts, getProductById, getProductsAdmin} from '../controllers/productController.js'
import protect, {isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getProducts);
router.route('/admin').get(protect, isAdmin, getProductsAdmin);
router.route('/:id').get(getProductById);

export default router; 