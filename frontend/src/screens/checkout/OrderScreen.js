import React, {useState, useEffect}   from 'react'
import {Link} from 'react-router-dom'
import {Button, Row, Col, ListGroup, Image, Card}               from 'react-bootstrap'
import {useDispatch, useSelector}   from 'react-redux'
import Message                      from '../../components/Message'
import Loader               from '../../components/Loader'
import {getOrderById}                from '../../actions/orderAction'

const OrderScreen = ({match}) => {

    const orderId = match.params.id;
    const dispatch  = useDispatch();
 

    const getOrder = useSelector(state => state.orderGet);
    const {order, loading, error} = getOrder; 

    //Calculate the prices
    order.itemsPrice = order.orderItems.reduce((acc, item) => 
                      acc + item.price * item.qty, 0);

    order.shippingPrice  = order.itemsPrice > 100 ? 0 : 20;
    order.taxtPrice      = Number((0.15 * order.itemsPrice).toFixed(2));
    
    order.totalPrice = (
    Number(order.itemsPrice) +
    Number(order.shippingPrice) +
    Number(order.taxtPrice)).toFixed(2);
  
    useEffect(() => {
       dispatch(getOrderById(orderId));
        // eslint-disable-next-line
    }, [])

    
 
    return loading ? 
    <Loader /> : 
    error ? 
    <Message variant='danger'>{error}</Message> : 
    
    <>
        <h1>Order {order._id}</h1>
        <Row>
               <Col md={8}>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Shipping</h2>
                           <p>
                               <strong>Address:</strong>
                               {order.shippingAddress.address},      {' '}
                               {order.shippingAddress.city},         {' '}
                               {order.shippingAddress.postalCode},   {' '}
                               {order.shippingAddress.country}
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Payment Method</h2>
                           <strong>Method: </strong>
                           {order.paymentMethod}
                       </ListGroup.Item>

                       <ListGroup.Item>
                           <h2>Order Items</h2>
                           {order.orderItems.length === 0 ? <Message>Your Cart is empty</Message> : 
                           (
                               <ListGroup variant='flush'>
                                   {order.orderItems.map((item, index) => (

                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image 
                                                src={item.image} 
                                                alt={item.name}
                                                fluid
                                                rounded /> 
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = 
                                                ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                   ))}

                               </ListGroup>
                           )}
                       </ListGroup.Item>
                   </ListGroup>
               </Col>
               <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                          <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxtPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                   {/*<ListGroup.Item>
                        {error && <Message variante='danger'>{error}</Message>}
                    </ListGroup.Item>
                   <ListGroup.Item>
                        <Button 
                        type='button'
                        className='btn-block'
                        disabled={order.cartItems === 0}
                        onClick ={placeOrderHandler}>
                            Place Order
                        </Button>
                    </ListGroup.Item> */}
                </Card>  
               </Col>
           </Row>
    </>
}

export default OrderScreen
