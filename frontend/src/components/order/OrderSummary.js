import React from 'react'
import { Col, ListGroup, Row } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../Loader'

const OrderSummary = ({order, paypalSdkReady, loadingPay, successPaymentHandler}) => {
    return (
        <>
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
    {!order.isPaid && (
        <ListGroup.Item>
            {loadingPay && (<Loader />)}
            {!paypalSdkReady ? 
            (<Loader />) :
            ( <PayPalButton 
              amount = {order.totalPrice}
              onSuccess = {successPaymentHandler}
              /> 
            )}
        </ListGroup.Item>
    )}</>
    )
}

export default OrderSummary
