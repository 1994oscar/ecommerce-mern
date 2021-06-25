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

    console.log(req.body)

if(orderItems && orderItems.length === 0) {
    res.status(400); //Bad Request
    throw new Error('No order items');
    return
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

export {addOrderItems}; 