import React, {useState, useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Form, Button, Row, Col, Table}     from 'react-bootstrap'
import {useDispatch, useSelector}   from 'react-redux'
import Message  from '../../components/Message'
import Loader   from '../../components/Loader'
import {getUserDetails, update, login}  from '../../actions/userAction'
import {getMyOrders} from '../../actions/orderAction'

const ProfileScreen = ({history}) => {

    const dispatch      = useDispatch();

    const [name, setName]           = useState('');
    const [email, setEmail]         = useState('');
    const [password, setPassword]   = useState('');
    const [confirmPassword, setConfirmPassword]   = useState('');
    const [message, setMessage]     = useState(null);

    const userDetails   = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userLogin     = useSelector(state => state.userLogin);
    const {userInfo}    = userLogin;

    const userUpdateProfile     = useSelector(state => state.userUpdate);
    const updateResult    = userUpdateProfile;

    const orderGetMy = useSelector(state => state.orderGetMy);
    const {orders, success:successOrders, loading:loadingOrders, error:errorOrders} = orderGetMy;

    useEffect(()=> {    
        if(!userInfo){
            history.push('/login');         
        }else{
            if(!user.name){
                dispatch(getUserDetails('profile'));                   
            }else{ 
                setName(user.name);
                setEmail(user.email);           
            }
        }
      
    }, [dispatch,history, userInfo, user]);

    useEffect(() => {
        dispatch(getMyOrders());
    }, [dispatch])

    const submitHandler = (e) => {
        e.preventDefault();      
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }

        dispatch(update({id:user._id, name, email, password}))
    }

    return (
        <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            {message    && <Message variant='danger'>{message}</Message>}
            {error      &&   <Message variant='danger'>{error}</Message>}
            {updateResult.success    &&   <Message variant='success'>Profile Updated</Message>}
            {loading    && <Loader/>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Personal name</Form.Label>
                    <Form.Control 
                        type='text'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type='password'
                        placeholder='Confirm the password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='warning'>Update</Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader/> : 
             errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
             (
                 <Table striped bordered hover responsive className='table-sm'>
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>DATE</th>
                             <th>TOTAL</th>
                             <th>PAID</th>
                             <th>DELIVERED</th>
                             <th></th>
                         </tr>
                         </thead>
                         <tbody>
                             {
                                orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? order.paidAt: (
                                            <i className='fas fa-times' style={{color:'red'}}> Not Paid</i>
                                        )}</td>
                                        <td>{order.isDelivered? 'Delivered':  (
                                             <i className='fas fa-times' style={{color:'red'}}> Not Delivered</i>
                                        )}</td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr> 
                                ))
                             }
                         </tbody>                 
                 </Table>
             )}
        </Col>
    </Row>   
    )
}

export default ProfileScreen