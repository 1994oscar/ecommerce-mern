
import React, {useEffect}   from 'react'

import {Row, Col, ListGroup, Image, Card, Button} from 'react-bootstrap'
import {useDispatch, useSelector}   from 'react-redux'
import Message                      from '../../components/Message'
import Loader                       from '../../components/Loader'
import {getOrderById, payOrder}               from '../../actions/orderAction'
import {ORDER_PAY_RESET} from '../../constants/orderConstant'
import OrderItems from '../../components/order/OrderItems'
import ShippingDetails from '../../components/order/ShippingDetails'
import PaymentMethod from '../../components/order/PaymentMethod'
import {setAsDeliveredAdmin} from '../../actions/orderAction'

const OrderAdminDetails = ({match}) => {

    const dispatch = useDispatch();

    const orderId = match.params.id; 

    const getOrder = useSelector(state => state.orderGet);
    const {order, loading, error} = getOrder; 

    const setAsDelivered = useSelector(state => state.orderSetDeliveredAdmin);
    const {loading:deliveredLoading, success:deliveredSuccess, error:deliveredError} = setAsDelivered;

    useEffect(()=> {

        if(!order || deliveredSuccess){
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderById(orderId));
        }
    },[dispatch, deliveredSuccess]); 

    const setDeliveredHandler = (e) => {
        e.preventDefault();
        
        dispatch(setAsDeliveredAdmin(orderId));
    }

    return (
        loading ? 
        <Loader /> : 
        error ? 
        <Message variant='danger'>{error}</Message> : 
    
        <Row>
            <Col md={4}>   
            <ListGroup variant='flush'>         
                <OrderItems         order={order} />
                </ListGroup>
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>                
                    <ShippingDetails    order={order} />
                    <Button disabled={!order.isPaid ? true : order.isDelivered ? true : false} variant='primary' onClick={setDeliveredHandler}>Set as delivered</Button>               
                </ListGroup> 
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <PaymentMethod order={order} />
                </ListGroup>                 
            </Col>           
        </Row>
    )
}

export default OrderAdminDetails
