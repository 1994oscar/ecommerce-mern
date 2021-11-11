import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col}     from 'react-bootstrap'
import {useDispatch, useSelector}   from 'react-redux'
import Message  from '../../components/Message'
import Loader   from '../../components/Loader'
import {getUserById, updateUserAdmin}  from '../../actions/userAction'
import FormContainer from '../../components/FormContainer'

const UserEditScreen = ({location, match}) => {

    const idUser = match.params.id;
    const [name, setName]           = useState('');
    const [email, setEmail]         = useState('');
    const [isAdmin, setIsAdmin]     = useState(false);

    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.userInfo);
    const {loading, error, success, user} = userInfo;

    const userUpdate = useSelector(state => state.userUpdateAdmin);
    const {loading:updateLoading, error:updateError, success:updateSuccess, user:updateUser} = userUpdate;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        dispatch(getUserById(match.params.id));
    },[dispatch]);

    useEffect(() => {
        if(success){
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[success]);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {idUser, name, email, isAdmin};
        dispatch(updateUserAdmin(data));
    }

    return (
        <FormContainer>
            <h1>Edit User</h1>

            {updateSuccess    && <Message variant='success'>'The user was updated'</Message>}
            {updateError      && <Message variant='danger'>{updateError}</Message>}
            {loading          && <Loader/>}
            {updateLoading    && <Loader/>}

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

                <Form.Group controlId='isAdmin'>
                    <Form.Check
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}>
                    </Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>Save changes</Button>
            </Form>
        </FormContainer>
    )
}

export default UserEditScreen