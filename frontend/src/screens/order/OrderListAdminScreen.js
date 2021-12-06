import React, {useEffect}           from 'react'
import {LinkContainer}              from 'react-router-bootstrap'
import {Table, Button, Row, Col}              from 'react-bootstrap'
import {useDispatch, useSelector}   from "react-redux"
import Message                      from '../../components/Message'
import Loader                       from '../../components/Loader'
import {getOrdersAdmin}             from '../../actions/orderAction'

const OrderListAdminScreen = ({history}) => { 

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const getOrders = useSelector(state => state.orderGetAdmin);
    const {success, loading, error, orders} = getOrders;
   
    useEffect(() => {
      
        if(!userInfo.isAdmin){
            history.push('/login');
        }

        dispatch(getOrdersAdmin()); 

    }, [dispatch, history, userInfo]);  

    
    return (
        <>
            <h1>Orders</h1>           
            {loading && <Loader />}
            {success && (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th>Payment Method</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user}</td>
                                <td>{`$${order.totalPrice}`}</td>
                                <td><span style={order.isPaid ? {color:'green'}: {color:'red'}}>{order.isPaid ? "Paid": "Not Paid"}</span></td>
                                <td><span style={order.isDelivered ? {color:'green'}: {color:'red'}}>{order.isDelivered ? "Delivered": "Not Delivered"}</span></td>
                                <td>{order.paymentMethod}</td>
                                <td>
                                    <LinkContainer to={`/admin/orders/edit/${order._id}`}>
                                        <Button variant='info' className='btn-sm'> <i className='fas fa-eye'></i> </Button>
                                    </LinkContainer>                                  
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListAdminScreen