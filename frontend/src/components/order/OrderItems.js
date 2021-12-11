import React from 'react'
import { ListGroup, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../Message'

const OrderItems = ({order}) => {
    return (
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
    )
}

export default OrderItems
