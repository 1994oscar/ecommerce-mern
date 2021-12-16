import React, {useEffect}           from 'react'
import {LinkContainer}              from 'react-router-bootstrap'
import {Table, Button, Row, Col}              from 'react-bootstrap'
import {useDispatch, useSelector}   from "react-redux"
import Message                      from '../../components/Message'
import Loader                       from '../../components/Loader'
import {listProductsAdmin,createProductsAdmin, deleteProductAdmin}          from "../../actions/productAction"
import {PRODUCT_CREATE_ADMIN_RESET } from '../../constants/productsConstants'
import Paginate from '../../components/Paginate'

const ProductListScreen = ({match, history}) => { 

    const pageNumber = match.params.pageNumber; 

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const productsList = useSelector(state => state.productListAdmin);
    const {loading, success, error, products, page, pages} = productsList;

    const productCreate = useSelector(state => state.productCreateAdmin);
    const {success:createSuccess, product:productData, error:createError} = productCreate; 
    
    const deleteProduct = useSelector(state => state.productDeleteAdmin);
    const {success:deleteSuccess, error:deleteError, message: deleteMessage} = deleteProduct;
    
    useEffect(() => {
        
        dispatch({type:PRODUCT_CREATE_ADMIN_RESET }); 
       
        if(!userInfo || !userInfo.isAdmin){
            history.push('/login');
        }

        if(createSuccess){
            history.push(`/admin/products/edit/${productData._id}`); 
        }else{
            dispatch(listProductsAdmin({keyword: '', pageNumber}));
        }

    }, [dispatch, history, userInfo, deleteSuccess, createSuccess, productData, pageNumber]);

    const deleteProductHandler = (userId) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProductAdmin(userId));
        }
 
    }

    const createProductHandler = (e) => {
        e.preventDefault();      
        dispatch(createProductsAdmin());       
    }

    return (
        <>
            <h1>Products</h1>
            <Row className='align-items-center'>
                <Col>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loading    && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            {deleteSuccess && <Message variant='success'>{deleteMessage}</Message>}
            {deleteError && <Message variant='danger'>{deleteError}</Message>}
            {createError && <Message variant='danger'>{createError}</Message>}
            {success && (
                <>
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
                                    <LinkContainer to={`/admin/products/edit/${product._id}`}>
                                        <Button variant='warning' className='btn-sm'> <i className='fas fa-edit'></i> </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={ () => deleteProductHandler(product._id)}><i className='fas fa-trash'></i></Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen