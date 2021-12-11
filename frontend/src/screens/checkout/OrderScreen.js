import React, {useState, useEffect}   from 'react'
import axios from 'axios'
import {Row, Col, ListGroup, Image, Card} from 'react-bootstrap'
import {useDispatch, useSelector}   from 'react-redux'
import Message                      from '../../components/Message'
import Loader                       from '../../components/Loader'
import {getOrderById, payOrder}               from '../../actions/orderAction'
import {ORDER_PAY_RESET} from '../../constants/orderConstant'
import OrderItems from '../../components/order/OrderItems'
import ShippingDetails from '../../components/order/ShippingDetails'
import PaymentMethod from '../../components/order/PaymentMethod'
import OrderSummary from '../../components/order/OrderSummary'

import { priceCalculation } from '../../helpers/orderHelpers'

const OrderScreen = ({match}) => {
    const dispatch  = useDispatch();
    const orderId = match.params.id; 

    const [paypalSdkReady, setPaypalSdkReady] = useState(false);
 

    /** Order Details from Redux*/
    const getOrder = useSelector(state => state.orderGet);
    const {order, loading, error} = getOrder; 

    /** Order Pay from Redux */
    const orderPay = useSelector( state => state.orderPay);
    const {success: successPay, loading: loadingPay} = orderPay; 

    /** Price calculation */
    if(!loading){
        priceCalculation(order);
    }
  
    useEffect(() => {
        const addPaypalScript = async () => {
            const {data:clientId} = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type= 'text/javascript';
            script.src =  `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setPaypalSdkReady(true);
            }
            document.body.appendChild(script);
        }
     
        if(!order || successPay){
            dispatch({type: ORDER_PAY_RESET}); 
            dispatch(getOrderById(orderId));
        } else if(!order.isPaid){
            if(!window.paypal) {
                addPaypalScript();
            } else {
                setPaypalSdkReady(true);
            }
        }
        
    }, [dispatch, orderId, successPay, order]);

    /** Paypal success handler */
    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch( payOrder(orderId, paymentResult)); 
    }
 
    return loading ? 
        <Loader /> : 
        error ? 
        <Message variant='danger'>{error}</Message> : 
    
        <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>                
                    <ShippingDetails    order={order} />
                    <PaymentMethod      order={order} />
                    <OrderItems         order={order} />
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                       <OrderSummary  
                        order={order} 
                        loadingPay = {loadingPay} 
                        paypalSdkReady={paypalSdkReady} 
                        successPaymentHandler={successPaymentHandler} />
                    </ListGroup>
                </Card>  
            </Col>
        </Row>
    </>
}

export default OrderScreen
