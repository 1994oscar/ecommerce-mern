import express from 'express'
import {addOrderItems, 
        getOrderById, 
        updateOrderToPaid, 
        getMyOrders,
        getOrdersAdmin,
        updateOrderToDelivered} from '../controllers/orderController.js'
import protect,  {isAdmin} from '../middleware/authMiddleware.js' 

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/admin').get(protect, isAdmin, getOrdersAdmin);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/admin/:id/deliver').put(protect, updateOrderToDelivered);



export default router; 