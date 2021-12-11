
export const priceCalculation = (order) => {  
        order.itemsPrice = order.orderItems.reduce((acc, item) => 
                          acc + item.price * item.qty, 0);
    
        order.shippingPrice  = order.itemsPrice > 100 ? 0 : 20;
        order.taxtPrice      = Number((0.15 * order.itemsPrice).toFixed(2));

        return order;       
}