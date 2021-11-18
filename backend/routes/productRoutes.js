import express from 'express'
import {getProducts, getProductById, getProductsAdmin, createProduct, deleteProduct, updateProduct} from '../controllers/productController.js'
import protect, {isAdmin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.route('/').get(getProducts);
router.route('/admin').get(protect, isAdmin, getProductsAdmin)
                      .post(protect, isAdmin, createProduct);
router.route('/admin/:id').put(protect, isAdmin, updateProduct)
                          .delete(protect, isAdmin, deleteProduct);
router.route('/:id').get(getProductById);

export default router; 