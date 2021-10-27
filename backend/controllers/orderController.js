import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js' 

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {

    //console.log(req.body)
   const {  
        orderItems, 
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    //console.log(req.body)

if(orderItems && orderItems.length === 0) {
    res.status(400); //Bad Request
    throw new Error('No order items');
} else {
    
    const order = new Order({
        user: req.user._id,
        orderItems, 
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    //Create the new Order
    const createOrder = await order.save();

    res.status(201).json(createOrder);
}

});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).
                  populate('user', 'name email');

    if(order) {
        res.json(order);
    }else{
        res.status(404);
        throw new Error('Order not found');
    }

});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id);

    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updte_time: req.body.update_time,
            email_address: req.body.email_address
        }

        const updatedOrder = await order.save(); 

        res.json(updatedOrder);

    }else{
        res.status(404);
        throw new Error('Order not found');
    }

});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({user: req.user._id});
    if(orders){
        res.json(orders)
    }else{
       res.status(404);
       throw new Erros('Orders not found');
    }
    
});

export {addOrderItems , getOrderById, updateOrderToPaid, getMyOrders}; 