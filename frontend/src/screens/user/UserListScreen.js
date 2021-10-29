import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {getUserList} from "../../actions/userAction"


const UserListScreen = () => {

    const dispatch = useDispatch();

    const users = useSelector(state => state.userList);
    const {userList, success, loading, error} = users;

    useEffect(() => {
        dispatch(getUserList());

    }, [dispatch]);

    return (
        <>
            <h1>Users</h1>
            {loading    && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userList.map(user => (
                                <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Admin': 'User'}</td>
                                {user.isAdmin? (<td></td>) : (<td><Button variant='danger' className='btn-sm'>Delete</Button></td>)}
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default UserListScreen