import React, {useEffect}           from 'react'
import {LinkContainer}              from 'react-router-bootstrap'
import {Table, Button}              from 'react-bootstrap'
import {useDispatch, useSelector}   from "react-redux"
import Message                      from '../../components/Message'
import Loader                       from '../../components/Loader'
import {listProductsAdmin, deleteProductAdmin}          from "../../actions/productAction"


const ProductListScreen = ({history}) => {

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const productsList = useSelector(state => state.productListAdmin);
    const {loading, success, error, products} = productsList;

    const deleteProduct = useSelector(state => state.productDeleteAdmin);
    const {loading:deleteLoading, success:deleteSuccess, error:deleteError, message: deleteMessage} = deleteProduct;
    
    useEffect(() => {

        /** Only admin user can access to users list */
        if(userInfo && userInfo.isAdmin){
            dispatch(listProductsAdmin());
        }else {
            history.push('/login');
        }

    }, [dispatch, history, userInfo, deleteSuccess]);

    const deleteProductHandler = (userId) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProductAdmin(userId));
        }
 
    }

    return (
        <>
            <h1>Products</h1>
            {loading    && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            {deleteSuccess && <Message variant='success'>{deleteMessage}</Message>}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {success && (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{`$${product.price}`}</td>
                                <td>{product.countInStock}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                        <Button variant='warning' className='btn-sm'> <i className='fas fa-edit'></i> </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={ () => deleteProductHandler(product._id)}><i className='fas fa-trash'></i></Button>
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

export default ProductListScreen