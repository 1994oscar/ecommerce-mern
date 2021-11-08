import React, {useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux"
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import {getUserList, deleteUser} from "../../actions/userAction"


const UserListScreen = ({history}) => {

    const dispatch = useDispatch();

    const users = useSelector(state => state.userList);
    const {userList, success, loading, error} = users;

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const {error: deleteUserError, 
        success: deleteUserSuccess, 
        message:deleteUserMessage, 
        loading:deleteUserLoading} = userDelete; 

    useEffect(() => {

        /** Only admin user can access to users list */
        if(userInfo && userInfo.isAdmin){
            dispatch(getUserList());
        }else {
            history.push('/login'); 
        }

    }, [dispatch, history]);

    const deleteUserHandler = (userId) => {
       dispatch(deleteUser(userId));
    }

    return (
        <>
            <h1>Users</h1>
            {loading    && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            {deleteUserLoading    && <Loader/>}
            {deleteUserError && <Message variant='danger'>{deleteUserError}</Message>}
            {deleteUserSuccess && <Message variant='success'>{deleteUserMessage}</Message>}
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
                                <td><a href={`mailto:{user.email}`}>{user.email}</a></td>
                                <td><span style={user.isAdmin ? {color:'green'}: {color:'blue'}}>{user.isAdmin ? 'Admin': 'User'}</span></td>
                                {user.isAdmin? (<td></td>) : 
                                (
                                    <td>
                                        <LinkContainer to={`/user/${user._id}/edit`}>
                                            <Button variant='warning' className='btn-sm'> <i className='fas fa-edit'></i> </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={ () => deleteUserHandler(user._id)}><i className='fas fa-trash'></i></Button>
                                    </td>
                                        
                                )}
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